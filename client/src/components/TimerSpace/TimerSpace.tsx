import React, { ReactElement } from 'react'
import TimerLayout from '../TimerLayout/TimerLayout'
import TimerContexts from './TimerContexts'
import Session from '../Session/Session'
import { RouteComponentProps } from 'react-router';


interface MatchParams {
	sessionId: string
}

export default function TimerSpace({match} :RouteComponentProps<MatchParams>): ReactElement {

	return (
		<Session id={match.params.sessionId}>
			<TimerContexts>
				<TimerLayout />
			</TimerContexts>
		</Session>
	)
}
