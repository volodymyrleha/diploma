import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import CalendarMonthDay from './CalendarMonthDay';

export default function CalendarMonth() {
    const classes = useStyles();

    const getDaysInMonth = (dayOfMonth) => {
        const month = dayOfMonth.getMonth() + 1;
        const year = dayOfMonth.getFullYear();

        return new Date(year, month, 0).getDate();
    }   

    const getDaysOfPreviousMonth = () => {
        const lastDayOfPreviousMonth = new Date();
        lastDayOfPreviousMonth.setDate(1);
        lastDayOfPreviousMonth.setHours(-1);

        return getDaysInMonth(lastDayOfPreviousMonth);
    }

    const getFirstDayWeekOfMonth = () => {
        const firstDay = new Date();
        firstDay.setDate(1);

        const dayOfWeek = firstDay.getDay();
        
        return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    }

    const getDaysOfMonthView = () => {
        const today = new Date();
        const currentMonth = getDaysInMonth(today);
        const prevMonth = getDaysOfPreviousMonth();
        const prevMonthOffset = getFirstDayWeekOfMonth();

        const daysToRender = [];

        for (let i = prevMonthOffset; i > 0; i--) {
            daysToRender.push({ 
                day: prevMonth - i + 1,
                active: false,
                disabled: true,
            });
        }

        const currentDay = today.getDate();

        for (let i = 0; i < currentMonth; i++) {
            daysToRender.push({ 
                day: i + 1,
                active: i + 1 === currentDay,
                disabled: false,
            });
        }

        const DAYS_IN_VIEW = 42;
        const daysOfNextMonth = DAYS_IN_VIEW - daysToRender.length;

        for (let i = 0; i < daysOfNextMonth; i++) {
            daysToRender.push({ 
                day: i + 1,
                active: false,
                disabled: true, 
            });
        }

        return daysToRender;
    }
    
    const days = getDaysOfMonthView();
    const daysToRender = days.map(
        item => <CalendarMonthDay day={item.day} active={item.active} disabled={item.disabled} />
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