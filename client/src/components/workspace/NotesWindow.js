import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NotesContainer from './NotesContainer';
import { makeStyles } from '@material-ui/core/styles';
import Window from './Window';


export default function NotesWindow() {
    const classes = useStyles();

    return (
        <Window>
            <NotesContainer />
            <Fab color="primary" aria-label="add" className={classes.addbutton}>
                <AddIcon />
            </Fab>
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