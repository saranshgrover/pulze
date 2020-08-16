import React, { ReactElement } from 'react'
import { EventID } from '../../@types/display'
import { useTimerDB } from '../../providers/TimerDBProvider'

export default function DrawScramble(): ReactElement {
	const [, , , { solve }] = useTimerDB()
	if (!solve) return <></>
	return (
		<>
			<scramble-display
				visualization='3D'
				style={{
					width: '100%',
					height: '100%',
				}}
				event={solve.eventId as EventID}
				scramble={solve.scramble}
			/>
		</>
	)
}
