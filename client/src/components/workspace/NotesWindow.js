import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NotesContainer from './NotesContainer';
import { makeStyles } from '@material-ui/core/styles';
import Window from './Window';
import NoteCreateDialog from './NoteCreateDialog';
import NoteEditDialog from './NoteEditDialog';

export default function NotesWindow() {
    const classes = useStyles();
    const [isNoteCreateDialogOpen, setIsNoteCreateDialogOpen] = useState(false);
    const [isNoteEditDialogOpen, setIsNoteEditDialogOpen] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState({});

    const openNoteCreateDialog = () => {
        setIsNoteCreateDialogOpen(true);
    }

    const closeNoteCreateDialog = () => {
        setIsNoteCreateDialogOpen(false);
    }

    const openNoteEditDialog = (note) => {
        setNoteToEdit(note);
        setIsNoteEditDialogOpen(true);
    }

    const closeNoteEditDialog = () => {
        setIsNoteEditDialogOpen(false);
    }

    return (
        <>
            <Window>
                <NotesContainer openEditDialog={openNoteEditDialog} />
                <Fab 
                    color="primary" 
                    aria-label="add" 
                    className={classes.addbutton} 
                    onClick={openNoteCreateDialog}
                >
                    <AddIcon />
                </Fab>
            </Window>
            <NoteCreateDialog isOpen={isNoteCreateDialogOpen} close={closeNoteCreateDialog} />
            <NoteEditDialog isOpen={isNoteEditDialogOpen} close={closeNoteEditDialog} note={noteToEdit} />
        </>
    );
}

const useStyles = makeStyles({
    addbutton: {
        position: 'fixed',
        bottom: '3em',
        right: '3em',
    },   
});