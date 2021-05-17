import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../features/user.slice';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Task({ id, title, description, state, openEditDialog }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(id));
    }

    const handleEdit = () => {
        openEditDialog({
            id,
            title,
            description,
            state
        });
    }

    return (
        <Box className={classes.task} component='div'>
            <Typography variant="h6" component="h6">
                {title}
            </Typography>
            <Typography variant="body1" component="p">
               {description}
            </Typography>
            <EditIcon onClick={handleEdit} />
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