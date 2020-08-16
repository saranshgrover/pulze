import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

// TODO RESPONSIVE FONT SIZES
const useStyles = makeStyles<Theme>((theme: Theme) => ({
	box: {
		padding: theme.spacing(2),
		border: `1px solid ${theme.palette.primary.main}`,
		resize: 'vertical',
		overflow: 'auto',
	},
	scramble: {
		width: '80%',
		fontSize: 'calc(10px + (30 - 10) * ((100vw - 300px) / (1600 - 300)));',
	},
}))
interface Props {
	scramble: string | undefined
}

export default function ScrambleView({ scramble }: Props): ReactElement {
	const classes = useStyles()
	return (
		<Box
			className={classes.box}
			display='flex'
			justifyContent='center'
			alignItems='center'
			m={1}
			p={1}
		>
			<Typography
				className={classes.scramble}
				align='center'
				color='textPrimary'
			>
				{scramble}
			</Typography>
		</Box>
	)
}
