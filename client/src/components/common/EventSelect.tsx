import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import activityKey from '../../constants/activityKey';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface Props {
    event: string
    handleChange: ((event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>, child: React.ReactNode) => void)
}

export default function EventSelect({event, handleChange}: Props) {
  const classes = useStyles();
return (
    <FormControl className={classes.formControl}>
    <InputLabel id="demo-simple-select-label">Event</InputLabel>
    <Select
      value={event}
      onChange={handleChange}
    >
      {Object.keys(activityKey).map(key => 
       <MenuItem key={key} value={key}>{activityKey[key]}</MenuItem>
        )}
    </Select>
  </FormControl>
)
}