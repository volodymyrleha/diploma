import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default function CalendarWeek({date}) {
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
    }, []);

    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(
            <div key={i} className={classes.borderedBlock}>
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
        right: "-7px",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#ea4949",
        zIndex: 3,
    }
});