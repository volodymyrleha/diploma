import React, { useState, useEffect } from 'react';
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
import { suggestTaskClass } from '../../model';
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { trainModel } from "../../model";

export default function TaskCreateDialog({ isOpen, close }) {
    const dispatch = useDispatch();
    const title = useTextfield();
    const description = useTextfield();
    const state = useTextfield({ value: 0 });
    const label = useTextfield({ value: 'none' });
    const [model, setModel] = useState(null);
    const [encoder, setEncoder] = useState(null);
    const [suggestion, setSuggestion] = useState(null);
   
    const CONFIDENCE_THRESHOLD = 0.65;

    useEffect(() => {
        (async () => {
            const loadModel = async () => {
                const sentenceEncoder = await use.load();
                const trainedModel = await trainModel(sentenceEncoder);
                setEncoder(sentenceEncoder);
                setModel(trainedModel);
            };
            await loadModel();
        })();
    }, []);

    let block = false;

    const handleTitle = (e) => {
        title.handleChange(e);

        if (!model)
            return;

        if (!encoder)
            return;
        
        if (block)
            return;
        
        block = true;

        setTimeout(async () => {
            const prediction = await suggestTaskClass(
                model,
                encoder,
                title.value,
                CONFIDENCE_THRESHOLD
            );

            setSuggestion(prediction);

            block = false;
        }, 400);
    }
    
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
            <DialogContent>
                <TextField
                    value={title.value}
                    onChange={handleTitle}
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
                <FormControl>
                    <InputLabel>Label</InputLabel>
                    <Select
                        value={label.value}
                        onChange={label.handleChange}
                    >
                    <MenuItem value={'none'}>None</MenuItem>
                    <MenuItem value={'learn'}>Learn</MenuItem>
                    <MenuItem value={'exercise'}>Exercise</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="body1" component="p">
                    {
                        suggestion === 'RUN' ?
                            'Suggestion: Exercise' :
                        suggestion === 'LEARN' ?
                            'Suggestion: Learn' :
                            'Suggestion: None'
                    }
                </Typography>
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