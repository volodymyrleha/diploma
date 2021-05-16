import React from 'react';
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

export default function CalenderWindow() {
    const classes = useStyles();

    return (
        <Window>
            <Grid className={classes.header} container justify="space-between" alignItems="center">
                <Typography variant="h4" component="h3">
                    Calendar
                </Typography>
                <Grid item>
                    <Grid container alignItems="center">
                        <KeyboardArrowLeftIcon />
                        <Typography variant="h5" component="h5">
                            Month
                        </Typography>
                        <KeyboardArrowRightIcon />
                    </Grid>
                </Grid>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>Day</Button>
                    <Button>Week</Button>
                    <Button>Month</Button>
                </ButtonGroup>
            </Grid>
            <CalendarMonth />
            <Fab 
                color="primary" 
                aria-label="add" 
                className={classes.addbutton} 
            >
                <AddIcon />
            </Fab>
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