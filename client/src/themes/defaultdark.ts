import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import red from '@material-ui/core/colors/red'
import blueGrey from '@material-ui/core/colors/blueGrey'
import green from '@material-ui/core/colors/green'

export const defaultdark = createMuiTheme({
	palette: {
		type: 'dark', // Name of the theme
		primary: red,
		secondary: blueGrey,
		contrastThreshold: 3,
		tonalOffset: 0.2,
		timer: {
			inspection: {
				start: 'rgb(255, 0, 0)',
				middle: 'rgb(255,255,0)',
				end: 'rgb(0, 255,0)',
			},
			spaceValid: green[400],
			spaceInvalid: red[400],
		},
		background: {
			default: '#000',
		},
	},
})
