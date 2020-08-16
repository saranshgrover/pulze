import React, {
	ReactElement,
	useState,
	useMemo,
	useContext,
	useEffect,
} from 'react'
import _newSolve from '../utils/newSolve'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TimerDB, Session } from 'timer-db'

interface SessionUpdates {
	addSolve: (solve: Timer.Solve) => void
	removeSolve: (solve: any) => void
	updateSolve: (solve: Timer.Solve) => void
	newSession: (name: string, event: string) => Promise<Session>
	setSession: (id: string) => Promise<void>
}

interface ActiveSolve {
	solve: Timer.Solve | undefined
	newSolve: () => void
}

export const TimerDBContext = React.createContext<
	[TimerDB, Session | null, SessionUpdates, ActiveSolve]
>([
	new TimerDB(),
	null,
	{
		addSolve: () => {},
		removeSolve: () => {},
		updateSolve: () => {},
		newSession: () => Promise.reject(undefined),
		setSession: () => Promise.reject(),
	},
	{ solve: undefined, newSolve: () => {} },
])

/**
 * Responsible for providing the session information. This is where we'd fetch the session information (in the future)
 *
 */
export default function TimerDBProvider({
	children,
}: React.PropsWithChildren<{}>): ReactElement {
	console.log('render')
	const [timerDB, setTimerDB] = useState<TimerDB>(new TimerDB())
	const [currentSession, setCurrentSession] = useState<Session | null>(null)
	useEffect(() => {
		if (currentSession) newSolve()
		else setSolve(undefined)
	}, [currentSession])

	useEffect(() => {
		async function initialize() {
			const sessions = await timerDB.getSessions()
			timerDB.startSync({
				username:
					localStorage.getItem('timerDBUsername') ??
					process.env.timerDBUsername!,
				password:
					localStorage.getItem('timerDBPassword') ??
					process.env.timerDBPassword!,
			})
		}
		let unsubscribe: (() => void) | void = void initialize().then(
			(unsub) => (unsubscribe = unsub)
		)
		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [])

	const addSolve = (solve: Timer.Solve) => {
		currentSession?.add({
			totalResultMs: solve.time,
			unixDate: Date.now(),
		})
	}
	const removeSolve = async (solve: any) => {
		currentSession?.delete(solve)
	}
	const updateSolve = addSolve

	const [solve, setSolve] = useState<Timer.Solve | undefined>(
		currentSession
			? _newSolve(currentSession.event, undefined, currentSession._id)
			: undefined
	)

	const newSolve = () => {
		if (currentSession) {
			setSolve(_newSolve(currentSession.event, undefined, currentSession._id))
		}
	}

	const newSession = async (name: string, event: string) => {
		return timerDB?.createSession(name, event)
	}

	const setSession = async (id: string) => {
		const sessions = await timerDB?.getSessions()
		if (!sessions) return Promise.reject()
		const session = sessions.find((session) => session._id === id)
		if (session) {
			setCurrentSession(session)
			return Promise.resolve()
		} else Promise.reject()
	}

	const value = useMemo<[TimerDB, Session | null, SessionUpdates, ActiveSolve]>(
		() => [
			timerDB,
			currentSession,
			{ addSolve, updateSolve, removeSolve, newSession, setSession },
			{ solve, newSolve },
		],
		[timerDB, currentSession, solve]
	)
	if (!timerDB) return <LinearProgress />

	return (
		<TimerDBContext.Provider value={value}>{children}</TimerDBContext.Provider>
	)
}
export const useTimerDB = () => useContext(TimerDBContext)
