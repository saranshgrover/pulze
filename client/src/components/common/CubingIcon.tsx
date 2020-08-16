import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import activityKey from '../../constants/activityKey'

const activityToIcon = {
	'222': 'event-222',
	'333': 'event-333',
	'444': 'event-444',
	'555': 'event-555',
	'666': 'event-666',
	'777': 'event-777',
	pyram: 'event-pyram',
	'333oh': 'event-333oh',
	'333bf': 'event-333bf',
	'444bf': 'event-444bf',
	'555bf': 'event-555bf',
	skewb: 'event-skewb',
	clock: 'event-clock',
	'333ft': 'event-333ft',
	'333mbf': 'event-333mbf',
	'333fm': 'event-333fm',
	sq1: 'event-sq1',
	minx: 'event-minx',
	'234567relay': 'unofficial-234567relay',
	'2345relay': 'unofficial-2345relay',
	kilominx: 'unofficial-kilominx',
	mpyram: 'unofficial-mpyram',
	redi: 'unofficial-redi',
	'666bf': 'unofficial-666bf',
	'777bf': 'unofficial-777bf',
	miniguild: 'unofficial-miniguild',
	mirror: 'unofficial-mirror',
}

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.type === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.54)',
		fontSize: 30,
	},
	iconSmall: {
		fontSize: 24,
	},
	selected: {
		color: theme.palette.primary.main,
	},
}))

interface Props {
	event: string,
	small?: boolean,
	showName?: boolean,
	selected?: boolean
}

const CubingIcon = ({ event, small = false, showName = false, selected = false, ...props }: Props & React.HTMLProps<HTMLSpanElement>) => {
	const classes = useStyles()
	return (
		<Grid
			container
			direction='column'
			alignItems='center'
			alignContent='center'
			justify='center'
		>
			<Grid item>
				<span
					className={clsx(
						'cubing-icon',
						` ${activityToIcon[event]}`,
						classes.icon,
						{
							[classes.iconSmall]: small,
							[classes.selected]: selected,
						}
					)}
					{...props}
				/>
			</Grid>
			{showName && (
				<Grid item>
					<Typography style={{ textTransform: 'none' }}>
						{activityKey[event]}
					</Typography>
				</Grid>
			)}
		</Grid>
	)
}

export default CubingIcon
