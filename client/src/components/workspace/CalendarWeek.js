import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const ALL_DAY = 1440;

export default function CalendarWeek({date, events}) {
    const classes = useStyles();
    const [today, setToday] = React.useState(new Date());

    const isToday = () => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
    }

    React.useEffect(() => {
        if (isToday()) {
            const interval = () => {
                setToday(new Date());
            }
            // every three minutes
            setInterval(interval, 1000 * 60 * 3);
    
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line
    }, []);

    const correctEvents = events.filter(event => event.duration < ALL_DAY);

    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(
            <div key={i} className={classes.borderedBlock}>
                {
                    correctEvents.filter(event => new Date(event.startDate).getHours() === i)
                        .map(event =>
                            <Typography 
                                key={event.id}
                                className={classes.event}
                                variant="body1" 
                                component="p"
                                style={{
                                    height: event.duration / 60 * 100 + "%",
                                    top: new Date(event.startDate).getMinutes() * 100 / 60 + "%",
                                }}
                            >
                                {event.title}
                            </Typography>
                        )
                }
                {
                    i === today.getHours() && isToday() ? 
                        <>
                            <div className={classes.timeline} style={{top: today.getMinutes() * 100 / 60 + "%"}}></div> 
                            <div className={classes.timelineCircle} style={{top: (today.getMinutes() * 100 / 60) - 16 + "%"}}></div>
                        </>
                        : undefined
                }
            </div>
        );
    }

    return (
        <Grid className={classes.container} container item direction="column" justify="center" alighItems="center">
            {hours}
        </Grid>
    );
}

const useStyles = makeStyles({
    container: {
        width: "calc(100% / 7)",
        padding: "0 !important",
    },
    borderedBlock: {
        position: "relative",
        borderLeft: "1px solid #ececec",
        borderBottom: "1px solid #ececec",
        minHeight: "2.4em",
    },
    timeline: {
        width: "100%",
        height: "1px",
        backgroundColor: "#ea4949",
        position: "absolute",
        left: "0",
        zIndex: 3,
    },
    timelineCircle: {
        position: "absolute",
        top: "0",
        right: "-6.4px",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#ea4949",
        zIndex: 3,
    },
    event: {
        position: "absolute",
        width: "100%",
        left: "0",
        border: '1px solid #66cc3d',
        borderRadius: "4px",
        padding: '0.2em 1em',
        color: '#66cc3d',
        fontSize: "0.8em",
        marginBottom: "0.4em",
        cursor: "pointer",
        boxSizing: "border-box",
        backgroundColor: "white",
        zIndex: 2,
    },
});