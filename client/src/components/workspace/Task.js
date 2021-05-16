import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../reducers/user.slice';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Task({ id, title, description }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(id));
    }

    return (
        <Box className={ classes.task } component='div'>
            <Typography variant="h6" component="h6">
                { title }
            </Typography>
            <Typography variant="body1" component="p">
               { description }
            </Typography>
            <DeleteIcon onClick={handleDelete} />
        </Box>
    );
}

const useStyles = makeStyles({
    task: {
        width: 'calc(100% - 2em)',
        minHeight: '16em',
        maxHeight: '16em',
        margin: '1em',
        backgroundColor: 'white',
        padding: '0.6em',
        boxSizing: 'border-box',
    },
});