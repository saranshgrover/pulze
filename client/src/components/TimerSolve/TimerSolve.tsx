import React, { ReactElement, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import ScrambleView from './ScrambleView'
import Solver from './Solver'
import { makeStyles, Theme } from '@material-ui/core'
import useKeyboardTimer from 'use-keyboard-timer'
import { TimerSettingsContext } from '../../providers/TimerSettingsProvider'
import { useTimerDB } from '../../providers/TimerDBProvider'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(4),
	},
	scrambler: {
		minHeight: '30%',
	},
	solver: {
		height: '70%',
	},
}))

interface Props {
	width: string
}

export default function TimerSolve({ width }: Props): ReactElement {
	const { settings } = useContext(TimerSettingsContext)
	const [, , { addSolve }, { solve, newSolve }] = useTimerDB()
	const onComplete = (
		time: number,
		penalty: Timer.TimerPenalty | undefined
	) => {
		const completedSolve = {
			...solve!,
			time,
			penalty,
			completedAt: new Date().getTime(),
		}
		addSolve(completedSolve)
		newSolve()
	}
	const timer = useKeyboardTimer(settings, onComplete)
	const classes = useStyles()
	return (
		<Grid
			className={classes.root}
			style={{ width }}
			container
			spacing={1}
			direction='column'
			justify='center'
			alignItems='center'
			alignContent='center'
			wrap='nowrap'>
			<Grid item style={{ width }}>
				<ScrambleView scramble={solve?.scramble} />
			</Grid>
			<Grid item style={{ display: 'flex', alignItems: 'center', width }}>
				<Solver timer={timer} />
			</Grid>
		</Grid>
	)
}
