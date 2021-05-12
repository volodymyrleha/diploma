import React from 'react';
import { useSelector } from 'react-redux';
import Note from './Note';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default function NotesContainer() {
    const classes = useStyles();
    const notes = useSelector(state => state.user.data.notes);

    return (
        <Grid className={classes.container} container>
            {
                notes.map(note => 
                    <Grid key={note._id} className={classes.item} item>
                        <Note 
                            id={note._id}
                            title={note.title} 
                            description={note.description}
                        />
                    </Grid>
                )
            }
        </Grid>
    );
}

const useStyles = makeStyles({
    container: {
        padding: '0 3em',
    },
    item: {
        margin: '2em',
    }
});