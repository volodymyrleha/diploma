import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CalendarWeek from './CalendarWeek';
import CalendarWeekHeader from './CalendarWeekHeader';

export default function CalendarWeekView({ activeDate }) {
    const classes = useStyles();
    const events = useSelector(state => state.user.data.events);

    const getFirstDayOfTheWeek = (date) => {
        const day = date.getDay(),
        diff = date.getDate() - day + (day === 0 ? - 6 : 1);
        return new Date(date.setDate(diff))
    }

    const firstDay = getFirstDayOfTheWeek(activeDate);
    const temp = new Date(firstDay);
    temp.setHours(0, 0, 0, 0);
    const days = [
        firstDay,
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
        new Date(temp.setDate(temp.getDate() + 1)),
    ];

    const eventsPrepared = events.map(item => ({
        id: item._id,
        date: (new Date(item.date)).setHours(0, 0, 0, 0),
        title: item.title,
        description: item.description,
        startDate: item.date,
        duration: item.duration,
    }));

    const eventsForDays = days.map(day => eventsPrepared.filter(event => event.date === day.getTime()));
   
    return (
        <>
            <Grid className={classes.container} container spacing={1} direction="row">
                <CalendarWeekHeader date={days[0]} events={eventsForDays[0]} />
                <CalendarWeekHeader date={days[1]} events={eventsForDays[1]} />
                <CalendarWeekHeader date={days[2]} events={eventsForDays[2]} />
                <CalendarWeekHeader date={days[3]} events={eventsForDays[3]} />
                <CalendarWeekHeader date={days[4]} events={eventsForDays[4]} />
                <CalendarWeekHeader date={days[5]} events={eventsForDays[5]} />
                <CalendarWeekHeader date={days[6]} events={eventsForDays[6]} />
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
                <CalendarWeek date={days[0]} events={eventsForDays[0]} />
                <CalendarWeek date={days[1]} events={eventsForDays[1]} />
                <CalendarWeek date={days[2]} events={eventsForDays[2]} />
                <CalendarWeek date={days[3]} events={eventsForDays[3]} />
                <CalendarWeek date={days[4]} events={eventsForDays[4]} />
                <CalendarWeek date={days[5]} events={eventsForDays[5]} />
                <CalendarWeek date={days[6]} events={eventsForDays[6]} />
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
        display: "flex",
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