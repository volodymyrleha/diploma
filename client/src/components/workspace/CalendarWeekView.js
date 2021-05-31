import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CalendarWeek from './CalendarWeek';
import CalendarWeekHeader from './CalendarWeekHeader';

export default function CalendarWeekView({ activeDate }) {
    const classes = useStyles();

    const getFirstDayOfTheWeek = (date) => {
        const day = date.getDay(),
        diff = date.getDate() - day + (day === 0 ? - 6 : 1);
        return new Date(date.setDate(diff))
    }

    const firstDay = getFirstDayOfTheWeek(activeDate);
    const temp = new Date(firstDay);
    const days = [
        firstDay,
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
    ];
   
    return (
        <>
            <Grid className={classes.container} container spacing={1}>
                <CalendarWeekHeader date={days[0]} />
                <CalendarWeekHeader date={days[1]} />
                <CalendarWeekHeader date={days[2]} />
                <CalendarWeekHeader date={days[3]} />
                <CalendarWeekHeader date={days[4]} />
                <CalendarWeekHeader date={days[5]} />
                <CalendarWeekHeader date={days[6]} />
            </Grid>
            <Grid className={`${classes.container} ${classes.containerHours}`} container spacing={1}>
                <div className={classes.hoursMarksContainer}>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        00:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        01:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        02:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        03:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        04:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        05:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        06:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        07:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        08:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        09:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        10:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        11:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        12:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        13:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        14:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        15:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        16:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        17:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        18:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        19:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        20:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        21:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        22:00
                    </Typography>
                    <Typography className={classes.hoursMark} variant="body1" component="p">
                        23:00
                    </Typography>
                </div>
                <CalendarWeek date={days[0]} />
                <CalendarWeek date={days[1]} />
                <CalendarWeek date={days[2]} />
                <CalendarWeek date={days[3]} />
                <CalendarWeek date={days[4]} />
                <CalendarWeek date={days[5]} />
                <CalendarWeek date={days[6]} />
            </Grid>
        </>
    );
}

const useStyles = makeStyles({
    container: {
        position: "relative",
        margin: '0em 2em',
        paddingLeft: '2em',
        width: 'calc(100% - 4em)',
        flexGrow: 1,
    },
    containerHours: {
        maxHeight: "68vh",
        overflowX: "hidden",
    },
    hoursMarksContainer: {
        position: "absolute",
        top: "0",
        left: "0",
    },
    hoursMark: {
        color: "#757575",
        fontSize: "0.7em",
        marginBottom: "2.07em",
    }
});