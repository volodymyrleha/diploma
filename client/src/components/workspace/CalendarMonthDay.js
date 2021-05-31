import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const ALL_DAY = 1440;

export default function CalendarMonthDay({ dayNumber, active, disabled, events }) {
    const classes = useStyles();

    return (
        <>
            <Typography 
                className={`${classes.day} ${active ? classes.active : ''} ${disabled ? classes.disabled : ''}`} 
                variant="body1" 
                component="p"
            >
                { dayNumber }
            </Typography>
            {
                events ? events.map(event => 
                    <Typography 
                        className={`${classes.event} ${event.duration < ALL_DAY ? classes.smallEvent : ''}`}
                        variant="body1" 
                        component="p"
                    >
                        <FiberManualRecordIcon className={classes.dot} />
                        {event.title}
                    </Typography>
                ) : undefined
            }
        </>
    );
}

const useStyles = makeStyles({
    day: {
        position: 'absolute',
        right: '0.6em',
        top: '0.6em',
        width: '2.2em',
        height: '2.2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginBottom: '0',
        fontSize: "0.8em",
    },
    active: {
        backgroundColor: '#8699ff',
        color: 'white',
        fontWeight: '600',
    },
    disabled: {
        color: '#949494',
    },
    event: {
        backgroundColor: '#cf5fea',
        padding: '0.2em 1em',
        borderRadius: '0.3em',
        color: 'white',
        fontSize: "0.8em",
        marginBottom: "0.4em",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "& svg": {
            display: "none",
        }
    },
    smallEvent: {
        color: "black",
        padding: '0.2em 0.2em',
        backgroundColor: "white",
        "& svg": {
            display: "inline",
        }
    },
    dot: {
        color: "#66cc3d",
        fontSize: "16px",
        marginRight: "0.4em",
    }
});