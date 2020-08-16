import React, {
	ReactElement,
	useState,
	useMemo,
	useContext,
	useEffect,
} from 'react'
import initialSessionState from '../constants/initialSessionState'
import _newSolve from '../utils/newSolve'
import { useRxDb, SolveCollection } from './RxDbProvider'
import solveSchema from '../database/solveSchema'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import SessionStats from '../utils/stats'
import { TimerDB, Session } from 'timer-db'

interface SessionUpdates {
	addSolve: (solve: Timer.Solve) => void
	removeSolve: (uid: string) => void
	updateSolve: (solve: Timer.Solve) => void
}

interface ActiveSolve {
	solve: Timer.Solve
	newSolve: () => void
}

export const SessionContext = React.createContext<
	[Timer.Session, SessionUpdates, ActiveSolve]
>([
	{ ...initialSessionState, solves: [] },
	{ addSolve: () => {}, removeSolve: () => {}, updateSolve: () => {} },
	{
		solve: _newSolve('333', undefined, ''),
		newSolve: () => {},
	},
])

interface Props {
	sessionInfo?: string
}
/**
 * Responsible for providing the session information. This is where we'd fetch the session information (in the future)
 *
 */
export default function SessionProvider({
	children,
	sessionInfo,
}: React.PropsWithChildren<Props>): ReactElement {
	console.log('render')
	const [session, setSession] = useState<Timer.SessionWithoutSolves>(
		initialSessionState
	)
	// const [stats, setStats] = useState(new SessionStats())
	const [solves, setSolves] = useState<Timer.Solve[]>([])
	const [collection, setCollection] = useState<SolveCollection>()
	const [error, setError] = useState<Error>()
	const timerDB = new TimerDB()
	const [timerDBSession, setTimerDBSession] = useState<Session>()
	const db = useRxDb()
	useEffect(() => {
		async function initialize() {
			const sessions = await timerDB.getSessions()
			const s: Session =
				sessions[0] ?? (await timerDB.createSession('3x3', '333'))
			console.log(s)
			setTimerDBSession(s)
			s.addStatListener(console.log)
			timerDB.startSync({
				username: `${localStorage.getItem('timerDBUsername')!}`,
				password: `${localStorage.getItem('timerDBPassword')!}`,
			})
			return () => s.removeStatListener(console.log)
		}
		let unsubscribe: (() => void) | undefined = undefined
		initialize().then((unsub) => (unsubscribe = unsub))
		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [])

	const addSolve = (solve: Timer.Solve) => {
		console.log(timerDBSession)
		timerDBSession?.add({
			totalResultMs: solve.time,
			unixDate: Date.now(),
		})
	}
	const removeSolve = async (uid: string) => {
		const solveToRemove = collection?.find().where('uid').eq(uid)
		await solveToRemove?.remove()
	}
	const updateSolve = addSolve

	const newSolve = () =>
		setSolve(_newSolve(session.eventId, session.subsetId, session.id))
	const [solve, setSolve] = useState<Timer.Solve>(
		_newSolve(session.eventId, session.subsetId, session.id)
	)

	const value = useMemo<[Timer.Session, SessionUpdates, ActiveSolve]>(
		() => [
			{ ...session, solves: solves },
			{ addSolve, removeSolve, updateSolve },
			{ solve, newSolve },
		],
		[session, solve, solves]
	)
	if (error)
		return (
			<Typography variant='h1' color='error'>
				{error.message}
			</Typography>
		)
	// if (!collection || !session === undefined) return <LinearProgress />
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	)
}
export const useSession = () => useContext(SessionContext)
