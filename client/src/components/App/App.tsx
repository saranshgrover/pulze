import React from 'react'
import ThemeProvider from '../../themes/ThemeProvider'
import MainNavigation from '../Navigation/MainNavigation'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import SidebarProvider from '../../providers/SidebarProvider'
import TimerDBProvider from '../../providers/TimerDBProvider'
import TimerSettingsProvider from '../../providers/TimerSettingsProvider'
import './App.css'

function App() {
	return (
		<ThemeProvider>
			<TimerDBProvider>
				<TimerSettingsProvider>
					<Router>
						<SidebarProvider initial={true}>
							<Sidebar />
							<MainNavigation />
						</SidebarProvider>
					</Router>
				</TimerSettingsProvider>
			</TimerDBProvider>
		</ThemeProvider>
	)
}

export default App
