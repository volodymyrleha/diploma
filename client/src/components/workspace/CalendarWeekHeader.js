import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function CalendarWeek({date}) {
    const classes = useStyles();
    const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    
    const isToday = () => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
    }

    return (
        <Grid className={classes.container} container item direction="column" justify="center" alighItems="center">
            <div className={classes.borderedBlock}>
                <Typography className={classes.dayOfWeek} variant="body1" component="p" align="center">
                    {dayOfWeek[date.getDay()]}
                </Typography>
                <Typography className={`${classes.numberOfDate} ${isToday() === true ? classes.activeDay : ''}`} variant="body1" component="p" align="center">
                    {date.getDate()}
                </Typography>
            </div>
        </Grid>
    );
}

const useStyles = makeStyles({
    container: {
        width: "calc(100% / 7)",
        padding: "0 !important",
    },
    dayOfWeek: {
        fontSize: "0.7em",
        color: "#757575",
    },
    numberOfDate: {
        fontSize: "1.4em",
        fontWeight: "400",
        width: "1.8em",
        height: "1.8em",
        margin: "auto",
        marginTop: "0.3em",
        marginBottom: "0.3em",
        backgroundColor: "#ececec",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    activeDay: {
        color: "white",
        backgroundColor: "#3f51b5",
    },
    borderedBlock: {
        borderLeft: "1px solid #ececec",
        borderBottom: "1px solid #ececec",
        minHeight: "2.4em",
    },
});