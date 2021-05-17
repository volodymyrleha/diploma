import React from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../features/user.slice';
import useTextfield from '../../hooks/useTextfield';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

export default function TaskCreateDialog({ isOpen, close }) {
    const dispatch = useDispatch();
    const title = useTextfield();
    const description = useTextfield();
    const state = useTextfield({ value: 0 });
    
    const create = () => {
        const body = {
            title: title.value,
            description: description.value,
            state: state.value,
        }

        dispatch(createTask(body));
        close();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Create a New Task</DialogTitle>
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
                <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={state.value}
                        onChange={state.handleChange}
                    >
                    <MenuItem value={0}>Todo</MenuItem>
                    <MenuItem value={1}>In Progress</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>
                    </Select>
                </FormControl>
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