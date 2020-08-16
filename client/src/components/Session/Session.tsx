import React, { ReactElement, useState, useEffect } from 'react'
import {useTimerDB} from '../../providers/TimerDBProvider'
import { LinearProgress } from '@material-ui/core'

interface Props {
	id: string
}

export default function Session({
	children,
	id
}: React.PropsWithChildren<Props>): ReactElement {
	const [,,{setSession}] = useTimerDB()
	const [error, setError] = useState<null | string>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setSession(id).then(() => setLoading(false)).catch(() => setError('No Session found'))
	},[])
	if(loading) return <LinearProgress/>
if(error) return <div>{error}</div>
	return (
		<>
		{children}
		</>)
}
