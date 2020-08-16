import React from 'react'
import { Typography, Grid, Fade, useTheme } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { formatSolve } from '../../utils/solves'

interface Props {
	time: number
	eventId: Timer.EventId
	state: string
}

export const formatAttemptResult = (
	attemptResult: number,
	eventId: Timer.EventId,
	state: string
) => {
	if (!attemptResult && state === 'NONE') return 'Ready'
	return formatSolve(attemptResult)
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {},
		text: {
			fontSize: 'calc(30px + (250	 - 30) * ((100vw - 300px) / (1600 - 300)));',
			position: 'static',
		},
	})
)

export default function Timing({
	time,
	eventId,
	state,
}: Props): React.ReactElement {
	const classes = useStyles()
	const theme = useTheme()
	return (
		<Fade in={true}>
			<Grid
				container
				className={classes.root}
				alignItems='center'
				justify='center'
			>
				<Grid item>
					<Typography
						style={{
							color: [
								'STOPPED',
								'SPACE_PRESSED_INSPECTION',
								'SPACE_PRESSED_TIMING',
							].includes(state)
								? theme.palette.timer.spaceInvalid
								: ['SPACE_PRESSED_VALID'].includes(state)
								? theme.palette.timer.spaceValid
								: theme.palette.text.primary,
						}}
						variant='h1'
						className={classes.text}
					>
						{formatAttemptResult(time, eventId, state)}
					</Typography>
				</Grid>
			</Grid>
		</Fade>
	)
}
