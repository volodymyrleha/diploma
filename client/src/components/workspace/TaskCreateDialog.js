import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../features/user.slice';
import useTextfield from '../../hooks/useTextfield';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import useModel from "../../hooks/useModel";
import { makeStyles } from '@material-ui/core/styles';

export default function TaskCreateDialog({ isOpen, close }) {
    const dispatch = useDispatch();
    const title = useTextfield();
    const description = useTextfield();
    const state = useTextfield({ value: 0 });
    const label = useTextfield({ value: 'none' });
    const model = useModel();
    const [suggestion, setSuggestion] = useState(null);
    const classes = useStyles();

    React.useEffect(() => {
        if (!isOpen) {
            title.setValue("");
            description.setValue("");
            state.setValue(0);
            label.setValue("none");
            setSuggestion(null);
        }
        // eslint-disable-next-line
    }, [isOpen]);

    React.useEffect(() => {
        const timer = setTimeout(async () => {
            const prediction = await model.suggestTaskClass(title.value);
            setSuggestion(prediction);
        }, 400);

        return () => clearTimeout(timer);
    }, [title.value, model]);
    
    const create = () => {
        const body = {
            title: title.value,
            description: description.value,
            state: state.value,
            labels: label.value === 'none' ? [] : [label.value],
        }

        dispatch(createTask(body));
        close();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Create a New Task</DialogTitle>
            <DialogContent className={classes.container} >
                <TextField
                    className={classes.field}
                    value={title.value}
                    onChange={title.handleChange}
                    autoFocus
                    label="Title"
                    fullWidth
                />
                <FormControl>
                    <InputLabel>Label</InputLabel>
                    <Select
                        value={label.value}
                        onChange={label.handleChange}
                        className={classes.select}
                    >
                        <MenuItem value={'none'}>None</MenuItem>
                        <MenuItem value={'learn'}>Learn</MenuItem>
                        <MenuItem value={'exercise'}>Exercise</MenuItem>
                    </Select>
                </FormControl>
                <Typography className={classes.suggestion} variant="body1" component="p">
                    {
                        suggestion === 'Exercise' ?
                            'Label suggestion: Exercise' :
                        suggestion === 'LEARN' ?
                            'Label suggestion: Learn' :
                            'Label suggestion: None'
                    }
                </Typography>
                <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={state.value}
                        onChange={state.handleChange}
                        className={`${classes.select} ${classes.field}`}
                    >
                        <MenuItem value={0}>Todo</MenuItem>
                        <MenuItem value={1}>In Progress</MenuItem>
                        <MenuItem value={2}>Done</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    className={classes.field}
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

const useStyles = makeStyles({
    container: {
        width: "32em",
    },
    field: {
        marginBottom: "1.2em",
    },
    select: {
        width: "16em",
    },
    suggestion: {
        marginTop: "0.8em",
        marginBottom: "1.2em",
        fontSize: "0.8em",
        color: "#5d5d5d",
    }
});