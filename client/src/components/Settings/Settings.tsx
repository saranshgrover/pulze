import React, { ReactElement } from 'react'
import { useTimerSettings } from '../../providers/TimerSettingsProvider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	paper: {
		height: '100vh',
		padding: theme.spacing(4),
	},
}))

export default function Settings(): ReactElement {
	const { settings, setSettings } = useTimerSettings()
	console.log(typeof settings.timerUpdate === 'number')
	const classes = useStyles()
	const handleChange = (
		e: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) => {
		setSettings({ [e.target.name!]: e.target.value })
	}

	return (
		<Paper className={classes.paper} square>
			<Grid container direction='column' justify='center'>
				<Grid item>
					<FormControl>
						<InputLabel htmlFor='layout'>Layout</InputLabel>
						<Select
							name='layout'
							value={settings.layout}
							onChange={handleChange}>
							<MenuItem value={'drawer'}>Drawer</MenuItem>
							<MenuItem value={'divider3'}>3 Layered Divider</MenuItem>
							<MenuItem value={'divider2'}>2 Layered Divider</MenuItem>
							<MenuItem value={'simple'}>Simple</MenuItem>
						</Select>
						<FormHelperText>
							The layout of your timer space. Blah blah blah
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item>
					<FormControl>
						<InputLabel htmlFor='timerUpdate'>Timer Update</InputLabel>
						<Select
							name='timerInput'
							value={
								typeof settings.timerUpdate === 'number'
									? 0
									: settings.timerUpdate
							}
							onChange={handleChange}>
							<MenuItem value={'deciseconds'}>Deciseconds</MenuItem>
							<MenuItem value={'seconds'}>Seconds</MenuItem>
							<MenuItem value={'milliseconds'}>Milliseconds</MenuItem>
							<MenuItem value={'seconds'}>Seconds</MenuItem>
							<TextField
								value={0}
								label='Time in Ms'
								onChange={(e) =>
									setSettings({ timerUpdate: parseInt(e.target.value) })
								}
							/>
						</Select>
						<FormHelperText>
							The layout of your timer space. Blah blah blah
						</FormHelperText>
					</FormControl>
				</Grid>
			</Grid>
		</Paper>
	)
}
