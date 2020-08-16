import * as createPalette from '@material-ui/core/styles/createPalette'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
declare module '@material-ui/core/styles/createPalette' {
	interface InpsectionColor {
		start: string
		middle: string
		end: string
	}
	interface PaletteOptions {
		timer: {
			inspection: InpsectionColor
			spaceInvalid: string
			spaceValid: string
		}
	}
	interface Palette {
		timer: {
			inspection: InpsectionColor
			spaceInvalid: string
			spaceValid: string
		}
	}
}
