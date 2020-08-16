import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useHistory } from 'react-router-dom'
import { fade } from '@material-ui/core/styles/colorManipulator'
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined'
import ButtonGroup from '@material-ui/core/ButtonGroup'

interface Props {
	children: React.ReactElement
	open: boolean
}

function ShowOnHover(props: Props) {
	const { children, open } = props
	return (
		<Slide appear={false} direction='down' in={open}>
			{children}
		</Slide>
	)
}

const useStyles = makeStyles((theme) => ({
	header: {
		height: '5vh',
		minHeight: '5vh',
	},
	root: {
		flexGrow: 1,
	},
	appBarButton: {
		maxHeight: '5vh',
		'&:hover': {
			backgroundColor: fade(theme.palette.grey[400], 0.6),
		},
	},
}))

export default function Header() {
	const [open, setOpen] = useState(true)
	const classes = useStyles()
	const history = useHistory()
	return (
		<div
			className={classes.root}
			onMouseOver={() => {
				!open && setOpen(true)
			}}
			onMouseOut={() => open && setOpen(false)}
			onClick={() => !open && setOpen(true)}
		>
			<ShowOnHover open={open}>
				<AppBar className={classes.header}>
					<Toolbar className={classes.header}>
						<Tooltip title='Home'>
							<ButtonBase
								className={classes.appBarButton}
								onClick={() => history.push('/')}
							>
								<HomeIcon />
							</ButtonBase>
						</Tooltip>
						<div className={classes.root} />
						<ButtonGroup variant='text' color='default'>
							<Tooltip title='Settings'>
								<ButtonBase
									className={classes.appBarButton}
									onClick={() => history.push('/settings')}
								>
									<SettingsIcon />
								</ButtonBase>
							</Tooltip>
							<Tooltip title='Profile'>
								<ButtonBase
									className={classes.appBarButton}
									onClick={() => history.push('/profile')}
								>
									<ProfileIcon />
								</ButtonBase>
							</Tooltip>
							<Tooltip title='Help'>
								<ButtonBase
									className={classes.appBarButton}
									onClick={() => history.push('/help')}
								>
									<HelpIcon />
								</ButtonBase>
							</Tooltip>
						</ButtonGroup>
					</Toolbar>
				</AppBar>
			</ShowOnHover>
			<Toolbar />
		</div>
	)
}
