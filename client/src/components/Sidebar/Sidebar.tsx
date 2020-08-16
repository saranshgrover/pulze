import React, { useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory } from 'react-router-dom'
import { fade } from '@material-ui/core/styles/colorManipulator'
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined'
import { SidebarContext } from '../../providers/SidebarProvider'

interface StyleProps {
	open: boolean
	drawerWidth: string
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
	root: {
		display: 'flex',
		maxWidth: ({ drawerWidth }) => drawerWidth,
	},
	openButton: {
		wdith: ({ drawerWidth }) => drawerWidth,
		opacity: ({ open }) => (!open ? 0.5 : 1),
		borderRadius: '50% 0 0 50%',
		backgroundColor: theme.palette.primary.main,
		right: 0,
		zIndex: theme.zIndex.drawer + 1,
		position: 'fixed',
		bottom: 0,
		'&:hover': {
			opacity: 1,
			// right: ({ open }) => (!open ? 10 : 0),
			width: ({ drawerWidth }) => `calc${drawerWidth} + 10)`,
			backgroundColor: fade(theme.palette.primary.main, 1),
		},
	},
	list: {
		padding: 0,
		margin: 0,
		overflow: 'hidden',
		maxWidth: ({ drawerWidth }) => drawerWidth,
	},
	listItem: {
		maxWidth: ({ drawerWidth }) => drawerWidth,
		padding: theme.spacing(2),
		'&:hover': {
			backgroundColor: fade(theme.palette.grey[400], 0.6),
		},
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: ({ drawerWidth }) => drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		backgroundColor: theme.palette.primary.main,
		width: ({ drawerWidth }) => drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: ({ drawerWidth }) => -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}))

export default function Sidebar() {
	const { open, setOpen, drawerWidth } = useContext(SidebarContext)
	const classes = useStyles({ open, drawerWidth })
	const history = useHistory()
	const handleDrawerChange = () => {
		setOpen(!open)
	}

	return (
		<div className={classes.root}>
			<IconButton
				disableTouchRipple
				className={classes.openButton}
				onClick={handleDrawerChange}
			>
				{open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
			</IconButton>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='right'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<List className={classes.list}>
					<Tooltip placement='left' title='Home'>
						<ListItem
							onClick={() => history.push('/')}
							button
							className={classes.listItem}
						>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
						</ListItem>
					</Tooltip>
				</List>
				<Divider />
				<List className={classes.list}>
					<Tooltip placement='left' title='Settings'>
						<ListItem
							onClick={() => history.push('/settings')}
							button
							className={classes.listItem}
						>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
						</ListItem>
					</Tooltip>
					<Tooltip placement='left' title='Profile'>
						<ListItem
							onClick={() => history.push('/profile')}
							button
							className={classes.listItem}
						>
							<ListItemIcon>
								<ProfileIcon />
							</ListItemIcon>
						</ListItem>
					</Tooltip>
					<Tooltip placement='left' title='Help'>
						<ListItem
							onClick={() => history.push('/help')}
							button
							className={classes.listItem}
						>
							<ListItemIcon>
								<HelpIcon />
							</ListItemIcon>
						</ListItem>
					</Tooltip>
				</List>
			</Drawer>
		</div>
	)
}
