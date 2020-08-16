import React, { ReactElement, useContext } from 'react'
import Inspection from '../Inspection/Inspection'
import Timing from '../Timing/Timing'
import { useSession } from '../../providers/SessionProvider'
import { TimerSettingsContext } from '../../providers/TimerSettingsProvider'
import { KeyboardTimer } from 'use-keyboard-timer/dist/useKeyboardTimer'

interface Props {
	timer: KeyboardTimer
}

export default function Solver({ timer }: Props): ReactElement {
	const [{ eventId }] = useSession()
	const { settings } = useContext(TimerSettingsContext)
	const inspection =
		settings.inspection === 'always' ||
		(settings.inspection === 'nonbld' && eventId.indexOf('bf') === -1)
	if (
		inspection &&
		[
			'INSPECTION',
			'INSPECTION_PENALTY',
			'SPACE_PRESSED_INSPECTION',
			'SPACE_PRESSED_TIMING',
			'SPACE_PRESSED_VALID',
		].includes(timer.state)
	)
		return (
			<Inspection
				time={timer.inspectionTime}
				plusTwo={timer.plusTwo}
				dnf={timer.dnf}
				state={timer.state}
			/>
		)
	else return <Timing time={timer.time} eventId={eventId} state={timer.state} />
}
