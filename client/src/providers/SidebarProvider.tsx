/**
 * The SidebarContext component provides a way to access the state of the sidebar, a function to change the state and the width it is using on the window.
 * This context is wrapped as a top level component to Sidebar and its siblings so that they can access this effectively.
 */

import React, { ReactElement, useState, useMemo, useContext } from 'react'

// TODO: passing default values like this isn't ideal. We could remove type safety here, but i'd rather follow this approach: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#hooks
interface SidebarContextType {
	open: boolean
	setOpen: (open: boolean) => void
	drawerWidth: string
}

export const SidebarContext = React.createContext<SidebarContextType>({
	open: true,
	setOpen: (open) => {},
	drawerWidth: 'calc(max(6vw, 48px))',
})

interface Props {
	initial: boolean
	children: React.ReactNode
}

export default function SidebarProvider({
	initial,
	children,
}: Props): ReactElement {
	const [open, setOpen] = useState(initial)
	const drawerWidth = 'calc(max(6vw, 48px))'
	const value = useMemo(() => ({ open, setOpen, drawerWidth }), [
		open,
		drawerWidth,
	])
	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	)
}

export const useSidebar = () => useContext(SidebarContext)