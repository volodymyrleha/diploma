import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../reducers/user.slice';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Note({ id, title, description, openEditDialog }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteNote(id));
    }

    const handleEdit = () => {
        openEditDialog({
            id,
            title,
            description
        });
    }

    return (
        <Box className={ classes.note } component='div'>
            <Typography variant="h4" component="h3">
               { title }
            </Typography>
            <Typography variant="body1" component="p">
               { description }
            </Typography>
            <EditIcon onClick={ handleEdit } />
            <DeleteIcon onClick={ handleDelete } />
        </Box>
    );
}

const useStyles = makeStyles({
    note: {
        width: '20em',
        height: '18em',
        padding: '1em',
        backgroundColor: '#FFFF88',
    },
});