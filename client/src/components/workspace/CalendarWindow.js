import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Window from './Window';
import CalendarMonth from './CalendarMonth';
import CalendarDayView from './CalendarDayView';
import CalendarWeekView from './CalendarWeekView';
import EventCreateDialog from './EventCreateDialog';
import CalendarHeader from "./CalenderHeader";
import useTab from '../../hooks/useTab';

export default function CalenderWindow() {
    const classes = useStyles();
    const calendarView = useTab('month');
    const [isEventCreateDialogOpen, setIsEventCreateDialogOpen] = useState(false);
    const [activeDate, setActiveDate] = useState(new Date());

    const openEventCreateDialog = () => {
        setIsEventCreateDialogOpen(true);
    }

    const closeEventCreateDialog = () => {
        setIsEventCreateDialogOpen(false);
    }

    return (
        <Window>
            <CalendarHeader calendarView={calendarView} activeDate={activeDate} setActiveDate={setActiveDate} />
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
    addbutton: {
        position: 'fixed',
        bottom: '3em',
        right: '3em',
    },
});