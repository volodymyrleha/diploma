import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../reducers/user.slice';
import useTextfield from '../../hooks/useTextfield';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function NoteCreateDialog({ isOpen, close }) {
    const dispatch = useDispatch();
    const title = useTextfield();
    const description = useTextfield();
    
    const create = () => {
        const payload = {
            title: title.value,
            description: description.value
        }

        dispatch(createNote(payload));
        close();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Create a New Note</DialogTitle>
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
                <Button onClick={create} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}