import React, { useState, useEffect } from 'react'
import {
	ThemeProvider as MuiThemeProvider,
	responsiveFontSizes,
} from '@material-ui/core/styles/'
import { defaultdark } from './defaultdark'
import { defaultlight } from './defaultlight'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CssBaseline from '@material-ui/core/CssBaseline'
const themeMap: { [key: string]: any } = {
	defaultdark,
	defaultlight,
}

export const ThemeContext = React.createContext(themeMap['defaultdark'])

const ThemeProvider: React.FC = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	console.log('Render Theme')
	// State to hold the selected theme name
	const [themeName, _setThemeName] = useState<undefined | string>(undefined)
	const setThemeName = (theme: string) => {
		_setThemeName(theme)
		localStorage.setItem('pulze_theme', theme)
	}
	// Check if user already has theme stored in localstorage. If they do, use it. Else, use the default light or dark theme based on browser preference
	useEffect(() => {
		const localTheme = localStorage.getItem('pulze_theme')
		const theme = localTheme
			? localTheme
			: prefersDarkMode
			? 'defaultdark'
			: 'defaultlight'
		console.log(theme)
		_setThemeName(theme)
	}, [prefersDarkMode])
	// Wait till theme isn't null
	if (themeName === undefined) return <></>
	// Retrieve the theme object by theme name

	return (
		<ThemeContext.Provider value={setThemeName}>
			<CssBaseline />
			<MuiThemeProvider theme={responsiveFontSizes(themeMap[themeName] || themeMap['defaultlight'])}>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	)
}
export default ThemeProvider
