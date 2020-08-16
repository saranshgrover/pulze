import React, { ReactElement } from 'react'
import { useTimerSettings } from '../../providers/TimerSettingsProvider'
import DrawerTimer from './DrawerTimer'
import DividerTimer from './DividerTimer'
import SimpleTimer from './SimpleTimer'
import Paper from '@material-ui/core/Paper'
import { useTheme } from '@material-ui/core'

export default function TimerLayout(): ReactElement {
	const { settings } = useTimerSettings()
	const theme = useTheme()
	const layout = settings.layout
	const component = () => {
		switch (layout) {
			case 'drawer':
				return <DrawerTimer />
			case 'divider2':
				return <DividerTimer cols={2} />
			case 'divider3':
				return <DividerTimer cols={3} />
			case 'simple':
				return <SimpleTimer />
		}
	}
	return (
		<Paper style={{ backgroundColor: theme.palette.background.default }}>
			{component()}
		</Paper>
	)
}
