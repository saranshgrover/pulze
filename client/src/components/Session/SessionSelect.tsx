import React, { useState, useEffect, useRef } from 'react'
import { useTimerDB } from '../../providers/TimerDBProvider'
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import { Session } from 'timer-db'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import LaunchIcon from '@material-ui/icons/Launch'
import CubingIcon from '../common/CubingIcon'
import DropdownIcon from '@material-ui/icons/ArrowDropDownOutlined'
import { useSidebar } from '../../providers/SidebarProvider'
import clsx from 'clsx'
import activityKey from '../../constants/activityKey'
import NewSessionPopover from './NewSessionPopover'

interface StyleProps {
	width: string
	open: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
	root: {
		width: (props) => (props.open ? `calc(100% -  ${props.width})` : '100%'),
		height: '100vh',
		backgroundColor: theme.palette.background.paper,
	},
	titleBar: {
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	gridList: {
		width: '100%',
		height: '90%',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		// padding: theme.spacing(2)
	},
}))

export default function SessionSelect() {
	const { open, drawerWidth } = useSidebar()
	const classes = useStyles({ width: drawerWidth, open: open })
	const [timerDB, , { newSession }] = useTimerDB()
	const [sessions, setSessions] = useState<Session[]>([])
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const history = useHistory()
	useEffect(() => {
		timerDB.getSessions().then((sessions) => setSessions(sessions))
	}, [])

	return (
		<>
			<NewSessionPopover
				isOpen={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				anchorEl={anchorEl}
			/>
			<div
				className={clsx(classes.root, '_scrollable only-y autoHideScrollbar')}>
				<GridListTile key='Subheader' cols={3} style={{ height: '8%' }}>
					<ListSubheader component='div' className={classes.header}>
						<span>Sessions</span>
						<Button
							color='primary'
							startIcon={<DropdownIcon />}
							size='small'
							variant='contained'
							onClick={(e) => setAnchorEl(e.currentTarget)}>
							New Session
						</Button>
					</ListSubheader>
				</GridListTile>
				<GridList
					className={clsx(
						classes.gridList,
						'_scrollable only-y autoHideScrollbar'
					)}
					cellHeight={220}
					cols={3}
					spacing={3}>
					{sessions.map((session) => (
						<GridListTile key={session._id}>
							<SessionCard session={session} />
						</GridListTile>
					))}
				</GridList>
			</div>
		</>
	)
}

interface Props {
	session: Session
}

function SessionCard({ session }: Props) {
	const history = useHistory()
	const theme = useTheme()
	return (
		<>
			<CubingIcon
				event={session.event}
				style={{ color: theme.palette.secondary.main, fontSize: '20vmin' }}
			/>
			<GridListTileBar
				title={session.name}
				subtitle={`${activityKey[session.event]}`}
				actionIcon={
					<IconButton
						color='primary'
						onClick={() => history.push(`/sessions/${session._id}`)}>
						<LaunchIcon />
					</IconButton>
				}
			/>
		</>
	)
}
