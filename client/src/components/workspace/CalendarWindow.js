import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import Window from './Window';
import CalendarMonth from './CalendarMonth';
import CalendarDayView from './CalendarDayView';
import CalendarWeekView from './CalendarWeekView';
import EventCreateDialog from './EventCreateDialog';
import useTab from '../../hooks/useTab';

export default function CalenderWindow() {
    const classes = useStyles();
    const calendarView = useTab('month');
    const [isEventCreateDialogOpen, setIsEventCreateDialogOpen] = useState(false);
    const [activeDate, setActiveDate] = useState(new Date());

    const getActiveMonthName = () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return `${monthNames[activeDate.getMonth()]} - ${activeDate.getFullYear()}`;
    }

    const getActiveDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${activeDate.getDate()}.${activeDate.getMonth() + 1}.${activeDate.getFullYear()} - ${days[activeDate.getDay()]}`;
    }

    const openEventCreateDialog = () => {
        setIsEventCreateDialogOpen(true);
    }

    const closeEventCreateDialog = () => {
        setIsEventCreateDialogOpen(false);
    }

    const goBack = () => {
        switch (calendarView.current) {
            case "month":
                setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() - 1)));
                break;
            case "week":
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
            case "day":
                setActiveDate(new Date(activeDate.setDate(activeDate.getDate() + 1)));
                break;
            default:
                setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() + 1)));
                break;
        }
    }

    return (
        <Window>
            <Grid className={classes.header} container justify="space-between" alignItems="center">
                <Typography variant="h4" component="h3">
                    Calendar
                </Typography>
                <Grid item>
                    <Grid container alignItems="center">
                        <KeyboardArrowLeftIcon onClick={goBack} />
                        <Typography variant="h5" component="h5">
                            { 
                                calendarView.current === "month" ?
                                    getActiveMonthName() :
                                calendarView.current === "day" ?
                                    getActiveDayName() :
                                    calendarView.current
                            }
                        </Typography>
                        <KeyboardArrowRightIcon onClick={goForward} />
                    </Grid>
                </Grid>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button 
                        onClick={() => calendarView.changeTab("day") }
                        variant={calendarView.current === "day" ? "contained" : "outlined"}
                    >
                        Day
                    </Button>
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
            {
                calendarView.current === "month" ?
                    <CalendarMonth activeDate={activeDate} /> :
                calendarView.current === "week" ?
                    <CalendarWeekView /> :
                    <CalendarDayView />
            }
            <Fab 
                color="primary" 
                aria-label="add" 
                className={classes.addbutton} 
                onClick={openEventCreateDialog}
            >
                <AddIcon />
            </Fab>
            <EventCreateDialog isOpen={isEventCreateDialogOpen} close={closeEventCreateDialog} />
        </Window>
    );
}

const useStyles = makeStyles({
    header: {
        padding: '2em',
    },
    addbutton: {
        position: 'fixed',
        bottom: '3em',
        right: '3em',
    },
});