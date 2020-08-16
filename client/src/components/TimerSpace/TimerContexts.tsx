import React, { ReactElement } from 'react'
import TimerProvider from '../../providers/TimerProvider'
import { useSession } from '../../providers/SessionProvider'
import { useTimerDB } from '../../providers/TimerDBProvider'
import LinearProgress from '@material-ui/core/LinearProgress'
interface Props {
	children: React.ReactNode
}

export default function TimerContexts({ children }: Props): ReactElement {
	const [, session] = useTimerDB()
	if (!session) return <LinearProgress />
	return (
		<TimerProvider eventId={session?.event} subsetId={undefined}>
			{children}
		</TimerProvider>
	)
}
