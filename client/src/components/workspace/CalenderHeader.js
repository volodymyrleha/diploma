import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';

export default function CalendarHeader({calendarView, activeDate, setActiveDate}) {
    const classes = useStyles();

    const getActiveMonthName = () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return `${monthNames[activeDate.getMonth()]} - ${activeDate.getFullYear()}`;
    }

    const getActiveWeekName = () => {
        const first = activeDate.getDate() - activeDate.getDay() + 1;
        const last = first + 6;

        const firstDay = new Date(activeDate.setDate(first));
        const lastDay = new Date(activeDate.setDate(last));

        let firstDate = firstDay.getDate();
        if (firstDate < 10) {
            firstDate = "0" + firstDate;
        }
        let firstMonth = firstDay.getMonth() + 1;
        if (firstMonth < 10) {
            firstMonth = "0" + firstMonth;
        }
        let lastDate = lastDay.getDate();
        if (lastDate < 10) {
            lastDate = "0" + lastDate;
        }
        let lastMonth = lastDay.getMonth() + 1;
        if (lastMonth < 10) {
            lastMonth = "0" + lastMonth;
        }

        return `${firstDate}.${firstMonth}.${firstDay.getFullYear()} - ${lastDate}.${lastMonth}.${lastDay.getFullYear()}`;
    }

    const getActiveDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let month = activeDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let date = activeDate.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        return `${date}.${month}.${activeDate.getFullYear()} - ${days[activeDate.getDay()]}`;
    }

    const goBack = () => {
        switch (calendarView.current) {
            case "month":
                setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() - 1)));
                break;
            case "week":
                setActiveDate(new Date(activeDate.setDate(activeDate.getDate() - 7)));
                break;
            case "day":
                setActiveDate(new Date(activeDate.setDate(activeDate.getDate() - 1)));
                break;
            default:
                setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() - 1)));
                break;
        }
    }

    const goForward = () => {
        switch (calendarView.current) {
            case "month":
                setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() + 1)));
                break;
            case "week":
                setActiveDate(new Date(activeDate.setDate(activeDate.getDate() + 7)));
                break;
            case "day":
                setActiveDate(new Date(activeDate.setDate(activeDate.getDate() + 1)));
                break;
            default:
                setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() + 1)));
                break;
        }
    }

    return (
        <Grid className={classes.headerContainer} container justify="space-between" alignItems="center">
            <Typography className={classes.header} variant="h4" component="h3">
                Calendar
            </Typography>
            <Grid item>
                <Grid container alignItems="center">
                    <KeyboardArrowLeftIcon className={classes.arrow} fontSize="large" onClick={goBack} />
                    <Typography className={classes.text} variant="h5" component="h5">
                        { 
                            calendarView.current === "month" ?
                                getActiveMonthName() :
                            calendarView.current === "day" ?
                                getActiveDayName() :
                                getActiveWeekName()
                        }
                    </Typography>
                    <KeyboardArrowRightIcon className={classes.arrow} fontSize="large" onClick={goForward} />
                </Grid>
            </Grid>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                {/*<Button 
                    onClick={() => calendarView.changeTab("day") }
                    variant={calendarView.current === "day" ? "contained" : "outlined"}
                >
                    Day
                </Button>*/}
                <Button 
                    onClick={() => calendarView.changeTab("week") }
                    variant={calendarView.current === "week" ? "contained" : "outlined"}
                >
                    Week
                </Button>
                <Button 
                    onClick={() => calendarView.changeTab("month") }
                    variant={calendarView.current === "month" ? "contained" : "outlined"}
                >
                    Month
                </Button>
            </ButtonGroup>
        </Grid>
    );
}

const useStyles = makeStyles({
    header: {
        fontWeight: "500",
    },
    headerContainer: {
        padding: '2em',
    },
    arrow: {
        margin: "0 0.8em",
        cursor: "pointer",
        transition: ".3s",
        "&:hover": {
            color: "#3f51b5",
        }
    },
    text: {
        fontWeight: "300",
    },
});