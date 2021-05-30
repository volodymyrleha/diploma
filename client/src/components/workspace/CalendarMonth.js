import React from 'react';
import { useSelector } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import CalendarMonthDay from './CalendarMonthDay';

export default function CalendarMonth({activeDate}) {
    const classes = useStyles();
    const events = useSelector(state => state.user.data.events);

    const getDaysInMonth = (dayOfMonth) => {
        const month = dayOfMonth.getMonth() + 1;
        const year = dayOfMonth.getFullYear();

        return new Date(year, month, 0).getDate();
    }   

    const getDaysOfPreviousMonth = () => {
        const lastDayOfPreviousMonth = new Date(activeDate);
        lastDayOfPreviousMonth.setDate(1);
        lastDayOfPreviousMonth.setHours(-1);

        return getDaysInMonth(lastDayOfPreviousMonth);
    }

    const getFirstDayWeekOfMonth = () => {
        const firstDay = new Date(activeDate);
        firstDay.setDate(1);

        const dayOfWeek = firstDay.getDay();
        
        return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    }

    const getDaysOfMonthView = () => {
        const currentMonth = getDaysInMonth(activeDate);
        const prevMonth = getDaysOfPreviousMonth();
        const prevMonthOffset = getFirstDayWeekOfMonth();

        const daysToRender = [];
        const dateOfView = new Date(activeDate);
        if (prevMonthOffset) {
            dateOfView.setDate(1);
            dateOfView.setHours(-1);
            dateOfView.setDate(prevMonth - prevMonthOffset + 1);
        } else {
            dateOfView.setDate(1);
        }
        dateOfView.setHours(0, 0, 0, 0);

        for (let i = prevMonthOffset; i > 0; i--) {
            daysToRender.push({ 
                dayNumber: prevMonth - i + 1,
                date: new Date(dateOfView),
                active: false,
                disabled: true,
            });

            dateOfView.setDate(dateOfView.getDate() + 1);
        }

        const today = new Date();
        const currentDay = today.getDate();

        for (let i = 0; i < currentMonth; i++) {
            daysToRender.push({ 
                dayNumber: i + 1,
                date: new Date(dateOfView),
                active: (i + 1 === currentDay) && (today.getMonth() === activeDate.getMonth()) && (today.getFullYear() === activeDate.getFullYear()),
                disabled: false,
            });

            dateOfView.setDate(dateOfView.getDate() + 1);
        }

        const DAYS_IN_VIEW = 42;
        const daysOfNextMonth = DAYS_IN_VIEW - daysToRender.length;

        for (let i = 0; i < daysOfNextMonth; i++) {
            daysToRender.push({ 
                dayNumber: i + 1,
                date: new Date(dateOfView),
                active: false,
                disabled: true, 
            });

            dateOfView.setDate(dateOfView.getDate() + 1);
        }

        return daysToRender;
    }
    
    const days = getDaysOfMonthView();
    const eventsPrepared = events.map(item => ({ 
        date: (new Date(item.date)).setHours(0, 0, 0, 0),
        title: item.title,
    }));

    const daysToRender = days.map(
        item => {
            const eventToRender = eventsPrepared.filter(event => event.date === item.date.getTime())[0];
            
            return (
                <CalendarMonthDay 
                    dayNumber={item.dayNumber} 
                    active={item.active} 
                    disabled={item.disabled} 
                    event={eventToRender ? eventToRender.title : null} 
                />
            );
        }
    );

    return (
        <GridList cellHeight={125} className={classes.container} cols={7}>
            {
                daysToRender.map((item, index) => 
                    <GridListTile className={classes.day} key={index} cols={1}>
                        { item }
                   </GridListTile>
                )
            }
        </GridList>
    );
}

const useStyles = makeStyles({
    container: {
        margin: '0em 2em',
        paddingLeft: '2em',
        height: '80vh',
        width: 'calc(100% - 4em)',
    },
    day: {
        borderRight: '1px solid #ECECEC',
        borderBottom: '1px solid #ECECEC',
        position: 'relative',
    }
});