import { Theme } from '@material-ui/core'

// This theme should contain overrides and global typography that is not affected by a particular theme style.
export const overrideTheme: Partial<Theme> = {
	overrides: {
		MuiIconButton: {
			root: {
				verticalAlign: 'middle',
			},
		},
	},
}
