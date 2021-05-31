import React from 'react';
import { useDispatch } from 'react-redux';
import { updateEvent } from '../../features/user.slice';
import useTextfield from '../../hooks/useTextfield';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const MIN_30 = 30;
const HOUR = 60;
const TWO_HOURS = 60 * 2;
const THREE_HOURS = 60 * 3;
const ALL_DAY = 1440;
const TWO_DAYS = 1440 * 2;
const THREE_DAYS = 1440 * 3;
const FOUR_DAYS = 1440 * 4;
const FIVE_DAYS = 1440 * 5;
const SIX_DAYS = 1440 * 6;
const SEVEN_DAYS = 1440 * 7;

export default function EventEditDialog({ isOpen, close, event, closeDetailsDialog }) {
    const dispatch = useDispatch();
    const title = useTextfield({ value: event ? event.title : '' });
    const description = useTextfield({ value: event ? event.description : '' });
    const duration = useTextfield({ value: event ? event.duration : ALL_DAY });
    const date = useTextfield({ value: event ? event.currentDate : new Date(), isDate: true });
    const classes = useStyles();

    React.useEffect(() => {
        if (!isOpen) {
            title.setValue("");
            description.setValue("");
            duration.setValue(ALL_DAY);
        }
        // eslint-disable-next-line
    }, [isOpen]);
    
    const update = () => {
        const payload = {
            id: event.id,
            body: {
                title: title.value,
                date: date.value.toISOString(),
                description: description.value,
                duration: duration.value,
            },
        };

        dispatch(updateEvent(payload));
        close();
        closeDetailsDialog();
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Create a New Event</DialogTitle>
            <DialogContent className={classes.container}>
                <TextField
                    className={classes.field}
                    value={title.value}
                    onChange={title.handleChange}
                    autoFocus
                    label="Title"
                    fullWidth
                />
                <FormControl>
                    <InputLabel>Duration</InputLabel>
                    <Select
                        value={duration.value}
                        onChange={duration.handleChange}
                        className={classes.select}
                    >
                        <MenuItem value={MIN_30}>30 min</MenuItem>
                        <MenuItem value={HOUR}>One hour</MenuItem>
                        <MenuItem value={TWO_HOURS}>Two hours</MenuItem>
                        <MenuItem value={THREE_HOURS}>Three hours</MenuItem>
                        <MenuItem value={ALL_DAY}>All day</MenuItem>
                        <MenuItem value={TWO_DAYS}>Two days</MenuItem>
                        <MenuItem value={THREE_DAYS}>Three days</MenuItem>
                        <MenuItem value={FOUR_DAYS}>Four days</MenuItem>
                        <MenuItem value={FIVE_DAYS}>Five days</MenuItem>
                        <MenuItem value={SIX_DAYS}>Six days</MenuItem>
                        <MenuItem value={SEVEN_DAYS}>Seven days</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        label="Start date"
                        value={date.value}
                        onChange={date.handleChange}
                        className={classes.select}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Start time"
                        value={date.value}
                        onChange={date.handleChange}
                        disabled={duration.value >= ALL_DAY}
                        className={`${classes.select} ${classes.selectRight}`}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </MuiPickersUtilsProvider>
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
                <Button onClick={update} color="primary">
                    Edit
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
        width: "14em",
        marginBottom: "1.2em",
    },
    selectRight: {
        marginLeft: "4em",
        marginTop: "0em",
    }
});