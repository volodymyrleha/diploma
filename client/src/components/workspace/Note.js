import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../features/user.slice';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from "./ConfirmationDialog";

export default function Note({ id, title, description, openEditDialog }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    const openDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    }

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setIsDeleteDialogOpen(false);
    }

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
        <>
            <Box className={ classes.note } component='div'>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography className={classes.title} variant="h4" component="h3">
                            { title }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <EditIcon className={`${classes.icon} ${classes.iconEdit}`} color="disabled" onClick={handleEdit} />
                        <DeleteIcon className={`${classes.icon} ${classes.iconDelete}`} color="disabled" onClick={openDeleteDialog} />
                    </Grid>
                </Grid>
                <Typography className={classes.description} variant="body1" component="p">
                { description }
                </Typography>
            </Box>
            <ConfirmationDialog
                open={isDeleteDialogOpen}
                title="Delete note"
                description="Are you sure you want to delete the note? All of the note data will be lost. You will not be able to undo this action."
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
            />
        </>
    );
}

const useStyles = makeStyles({
    note: {
        width: '20em',
        height: '18em',
        padding: '1em 1.6em',
        backgroundColor: '#FFFF88',
    },
    title: {
        fontWeight: "500",
        fontSize: "1.7em",
    },
    description: {
        marginTop: "1em",
        color: "#545454",
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