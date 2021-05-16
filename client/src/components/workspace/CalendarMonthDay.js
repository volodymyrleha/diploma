import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function CalendarMonthDay({ day, active, disabled }) {
    const classes = useStyles();

    return (
        <Typography 
            className={`${classes.day} ${active ? classes.active : ''} ${disabled ? classes.disabled : ''}`} 
            variant="body1" 
            component="p"
        >
            { day }
        </Typography>
    );
}

const useStyles = makeStyles({
    day: {
        position: 'absolute',
        right: '1em',
        top: '1em',
        width: '2.2em',
        height: '2.2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginBottom: '0',
    },
    active: {
        backgroundColor: '#3f51b5',
        color: 'white',
        fontWeight: '600',
    },
    disabled: {
        color: '#949494',
    }
});