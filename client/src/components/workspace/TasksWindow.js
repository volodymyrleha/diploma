import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Window from './Window';
import TasksList from './TasksList';
import TaskCreateDialog from './TaskCreateDialog';

export default function TasksWindow() {
    const classes = useStyles();
    const [isTaskCreateDialogOpen, setIsTaskCreateDialogOpen] = useState(false);
    const [tasksToRender, setTasksToRender] = useState({ todo: [], inProgress: [], done: [] });
    const tasks = useSelector(state => state.user.data.tasks);

    useEffect(() => {
        const todo = tasks.filter(task => task.state === 0);
        const inProgress = tasks.filter(task => task.state === 1);
        const done = tasks.filter(task => task.state === 2);
            
        setTasksToRender({
            todo,
            inProgress,
            done
        });
    }, [tasks]);

    const openTaskCreateDialog = () => {
        setIsTaskCreateDialogOpen(true);
    }

    const closeTaskCreateDialog = () => {
        setIsTaskCreateDialogOpen(false);
    }

    return (
        <>
            <Window>
                <Grid className={classes.container} container spacing={7}>
                    <Grid item xs={4}>
                        <TasksList header='Todo' tasks={tasksToRender.todo} />
                    </Grid>
                    <Grid item xs={4}>
                        <TasksList header='In Progress' tasks={tasksToRender.inProgress} />
                    </Grid>
                    <Grid item xs={4}>
                        <TasksList header='Done' tasks={tasksToRender.done} />
                    </Grid>
                </Grid>
                <Fab 
                    color="primary" 
                    aria-label="add" 
                    className={classes.addbutton} 
                    onClick={openTaskCreateDialog}
                >
                    <AddIcon />
                </Fab>
            </Window>
            <TaskCreateDialog isOpen={isTaskCreateDialogOpen} close={closeTaskCreateDialog} />
        </>
    );
}

const useStyles = makeStyles({
    addbutton: {
        position: 'fixed',
        bottom: '3em',
        right: '3em',
    },
    container: {
        maxHeight: '80vh',
        width: '100%',
        overflowY: 'hidden',
        paddingTop: '2em',
    }
});