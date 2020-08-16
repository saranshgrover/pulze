import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField'
import EventSelect from '../common/EventSelect'
import {useTimerDB} from '../../providers/TimerDBProvider'

const useStyles = makeStyles((theme) => ({
	popover: {
		background: theme.palette.background.paper,
		width: theme.spacing(40),
		borderRadius: theme.shape.borderRadius,
	},
	container: {
		display: "flex",
		padding: theme.spacing(2),
		flexDirection: "column",
		alignItems: "center",
	},
	bar: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonSignout: {
		borderRadius: theme.spacing(0.5),
		padding: theme.spacing(0.5, 2),
		fontSize: "0.8rem",
		fontWeight: 500,
		textTransform: "none",
	},
}));

interface Props {
    anchorEl: any,
    isOpen: boolean,
    onClose: () => void
}

export default function ProfilePopover({ anchorEl, isOpen, onClose }: Props) {
	const history = useHistory();
	const classes = useStyles();
	const theme = useTheme();
    const id = isOpen ? "profile-popover" : undefined;
    const [,,{newSession}] = useTimerDB()
    const [select, setSelect] = useState()
    const [name, setName] = useState('')
    const [event, setEvent] = useState('')
    const handleNewSession = async () => {
        const session = await newSession(name,event)
        console.log(session)
        if(session) {
        history.push(`/sessions/${session._id}`)
        }
    }
	return (
		<div>
			<Popover
				id={id}
				open={isOpen}
				anchorEl={anchorEl}
				onClose={onClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				classes={{
					paper: classes.popover,
				}}
			>
				<div className={classes.container}>
					<TextField label='Name' value={name} onChange={({target:{value}}) => setName(value)}/>
					<EventSelect event={event} handleChange={({target:{value}}) => setEvent(value as string)} />
				<Divider />
				<div className={classes.bar}>
					<Button
						variant='outlined'
						size='small'
                        onClick={handleNewSession}
                        disabled={name==='' || event===''}
						classes={{ root: classes.buttonSignout }}
					>
						Create Session
					</Button>
				</div>
                </div>
			</Popover>
		</div>
	);
}
