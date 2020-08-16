import React from 'react'
import { Typography, Grid, Fade } from '@material-ui/core'
import {
	Theme,
	createStyles,
	makeStyles,
	useTheme,
} from '@material-ui/core/styles'
import color from 'color'

interface Props {
	time: number
	plusTwo: boolean
	dnf: boolean
	state: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		text: {
			fontSize: 'calc(30px + (250	 - 30) * ((100vw - 300px) / (1600 - 300)));',
		},
	})
)

export default function Inspection({
	time,
	plusTwo,
	dnf,
	state,
}: Props): React.ReactElement {
	const theme = useTheme()
	const percentColors = [
		{
			pct: 0.0,
			color: color(theme.palette.timer.inspection.start).rgb().object(),
		},
		{
			pct: 0.5,
			color: color(theme.palette.timer.inspection.middle).rgb().object(),
		},
		{
			pct: 1.0,
			color: color(theme.palette.timer.inspection.end).rgb().object(),
		},
	]

	function getColorForPercentage(pct: number) {
		for (var i = 1; i < percentColors.length - 1; i++) {
			if (pct < percentColors[i].pct) {
				break
			}
		}
		var lower = percentColors[i - 1]
		var upper = percentColors[i]
		var range = upper.pct - lower.pct
		var rangePct = (pct - lower.pct) / range
		var pctLower = 1 - rangePct
		var pctUpper = rangePct
		var color = {
			r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
			g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
			b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
		}
		return 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
	}

	const classes = useStyles()
	return (
		<Fade in={true}>
			<Grid container alignItems='center' justify='center'>
				<Grid item>
					<Typography
						variant='h1'
						style={{
							color: [
								'SPACE_PRESSED_INSPECTION',
								'SPACE_PRESSED_TIMING',
							].includes(state)
								? theme.palette.timer.spaceInvalid
								: ['SPACE_PRESSED_VALID'].includes(state)
								? theme.palette.timer.spaceValid
								: getColorForPercentage(plusTwo || dnf ? 0 : time / 15),
						}}
						className={classes.text}
					>
						{plusTwo ? '+2' : dnf ? 'DNF' : Math.floor(time)}
					</Typography>
				</Grid>
			</Grid>
		</Fade>
	)
}
