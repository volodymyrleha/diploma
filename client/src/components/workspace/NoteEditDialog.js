import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../features/user.slice';
import useTextfield from '../../hooks/useTextfield';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function NoteEditDialog({ isOpen, close, note }) {
    const dispatch = useDispatch();
    const title = useTextfield({ value: note.title });
    const description = useTextfield({ value: note.description });

    useEffect(() => {
        if (isOpen) {
            title.setValue(note?.title);
            description.setValue(note?.description);
        }
        // eslint-disable-next-line
    }, [isOpen]);
    
    const handleEdit = () => {
        const body = {
            title: title.value,
            description: description.value
        }

        dispatch(updateNote({ 
            id: note.id, 
            body, 
        }));
        close();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
                <TextField
                    value={title.value}
                    onChange={title.handleChange}
                    autoFocus
                    label="Title"
                    fullWidth
                />
                <TextField
                    value={description.value}
                    onChange={description.handleChange}
                    label="Description"
                    multiline
                    rows={8}
                    rowsMax={8}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
}