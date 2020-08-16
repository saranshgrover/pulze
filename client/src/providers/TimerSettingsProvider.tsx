import React, { ReactElement, useState, useEffect, useContext } from 'react'
import defaultTimerSettings from '../constants/defaultTimerSettings'

interface TimerSettingsContextType {
	settings: Timer.TimerSettings
	setSettings: (newSettings: Partial<Timer.TimerSettings>) => void
}

export const TimerSettingsContext = React.createContext<
	TimerSettingsContextType
>({ settings: defaultTimerSettings, setSettings: () => {} })

interface Props {
	children: React.ReactNode
}

/**
 * The TimerSettings Provider gives a way to access the settings for a given users TimerSpace. It should be wrapped around a Timer as well as the Settings in order for users to chaange
 */
export default function TimerSettingsProvider({
	children,
}: Props): ReactElement {
	const [settings, _setSettings] = useState(defaultTimerSettings)
	useEffect(() => {
		const localSettings = localStorage.getItem('pulze_timerSettings')
		if (localSettings) setSettings(JSON.parse(localSettings))
		else localStorage.setItem('pulze_timerSettings', JSON.stringify(settings))
	}, [])
	const setSettings = (partialNewSettings: Partial<Timer.TimerSettings>) => {
		const newSettings = { ...settings, ...partialNewSettings }
		_setSettings(newSettings)
		localStorage.setItem('pulze_timerSettings', JSON.stringify(newSettings))
	}
	return (
		<TimerSettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</TimerSettingsContext.Provider>
	)
}

export const useTimerSettings = () => useContext(TimerSettingsContext)
