import React, { ReactElement } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Settings from '../Settings/Settings'
import Help from '../Help/Help'
import Profile from '../Profile/Profile'
import TimerSpace from '../TimerSpace/TimerSpace'
import SessionSelect from '../Session/SessionSelect'

export default function MainNavigation(): ReactElement {
	return (
		<Switch>
			<Route exact path='/settings' component={Settings} />
			<Route exact path='/help' component={Help} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/sessions' component={SessionSelect}/>
			<Route exact path='/sessions/:sessionId' component={TimerSpace} />
			<Redirect to='/sessions'/>
		</Switch>
	)
}
