import React from "react";
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../features/user.slice';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import EventEditDialog from './EventEditDialog';

export default function EventDetailsDialog({open, onClose, event}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    const openEditDialog = () => {
        setIsEditDialogOpen(true);
    }

    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
    }

    const handleDelete = () => {
        dispatch(deleteEvent(event.id));
        onClose();
    }

    return (
        <>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle className={classes.header} id="simple-dialog-title">
                    {event?.title}
                    <EditIcon className={`${classes.icon} ${classes.iconEdit}`} onClick={openEditDialog} />
                    <DeleteIcon className={`${classes.icon} ${classes.iconDelete}`} onClick={handleDelete} />
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText id="alert-dialog-description">
                        {event?.description}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <EventEditDialog isOpen={isEditDialogOpen} close={closeEditDialog} event={event} closeDetailsDialog={onClose} />
        </>
    );
}

const useStyles = makeStyles({
    header: {
        width: "24em",
        position: "relative"
    },
    content: {
        minHeight: "8em",
    },
    icon: {
        position: "absolute",
        top: "0.8em",
        right: "1em",
        cursor: "pointer",
        color: "#545454",
        transition: ".3s",
    },
    iconEdit: {
        right: "2.6em",
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