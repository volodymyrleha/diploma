import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../features/user.slice';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from "./ConfirmationDialog";

export default function Task({ id, title, description, state, labels, openEditDialog }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    const openDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    }

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    }

    const handleDelete = () => {
        dispatch(deleteTask(id));   
        setIsDeleteDialogOpen(false);
    }

    const handleEdit = () => {
        openEditDialog({
            id,
            title,
            description,
            state,
            labels,
        });
    }

    let taskStyles = classes.task;
    if (labels.includes("learn")) {
        taskStyles += " " + classes.taskCategory1;
    } else if (labels.includes("exercise")) {
        taskStyles += " " + classes.taskCategory2;
    }


    return (
        <>
            <Box className={taskStyles} component='div'>
                <Grid className={classes.header} container alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography variant="h6" component="h6">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <EditIcon className={`${classes.icon} ${classes.iconEdit}`} color="disabled" onClick={handleEdit} />
                        <DeleteIcon className={`${classes.icon} ${classes.iconDelete}`} color="disabled" onClick={openDeleteDialog} />
                    </Grid>
                </Grid>
                <Typography className={classes.description} variant="body1" component="p">
                    {description}
                </Typography>
                <Typography className={classes.label} variant="body1" component="p">
                    {labels[0] ? labels[0] : ''}
                </Typography>
            </Box>
            <ConfirmationDialog
                open={isDeleteDialogOpen}
                title="Delete task"
                description="Are you sure you want to delete the task? All of the task data will be lost. You will not be able to undo this action."
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
            />
        </>
    );
}

const useStyles = makeStyles({
    task: {
        position: "relative",
        borderLeft: "8px solid white",
        width: '100%',
        height: "12em",
        marginBottom: "1.2em",
        backgroundColor: 'white',
        padding: '0.6em 1.2em',
        boxSizing: 'border-box',
    },
    taskCategory1: {
        borderLeft: "8px solid #cf5fea",
    },
    taskCategory2: {
        borderLeft: "8px solid #66cc3d",
    },
    header: {
        marginBottom: "0.3em",
    },
    description: {
        color: "#545454",
    },
    label: {
        position: "absolute",
        bottom: "0.6em",
        right: "2em",
        color: "#545454",
        fontSize: "0.7em",
    },
    icon: {
        marginLeft: "0.4em",
        cursor: "pointer",
        transition: ".3s",
    },
    iconEdit: {
        "&:hover": {
            color: "#3f51b5",
        },
    },
    iconDelete: {
        "&:hover": {
            color: "#ea4949",
        },
    },
});