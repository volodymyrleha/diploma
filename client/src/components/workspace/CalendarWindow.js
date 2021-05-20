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
import EventCreateDialog from './EventCreateDialog';
import useTab from '../../hooks/useTab';

export default function CalenderWindow() {
    const classes = useStyles();
    const calendarView = useTab('month');
    const [isEventCreateDialogOpen, setIsEventCreateDialogOpen] = useState(false);
    const [activeDay, setActiveDay] = useState(new Date());

    const getActiveMonthName = () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return `${monthNames[activeDay.getMonth()]} - ${activeDay.getFullYear()}`;
    }

    const getActiveDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${activeDay.getDate()}.${activeDay.getMonth() + 1}.${activeDay.getFullYear()} - ${days[activeDay.getDay()]}`;
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
                setActiveDay(new Date(activeDay.setMonth(activeDay.getMonth() - 1)));
                break;
            case "week":
            case "day":
                setActiveDay(new Date(activeDay.setDate(activeDay.getDate() - 1)));
                break;
            default:
                setActiveDay(new Date(activeDay.setMonth(activeDay.getMonth() - 1)));
                break;
        }
    }

    const goForward = () => {
        switch (calendarView.current) {
            case "month":
                setActiveDay(new Date(activeDay.setMonth(activeDay.getMonth() + 1)));
                break;
            case "week":
            case "day":
                setActiveDay(new Date(activeDay.setDate(activeDay.getDate() + 1)));
                break;
            default:
                setActiveDay(new Date(activeDay.setMonth(activeDay.getMonth() + 1)));
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
            <CalendarMonth />
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