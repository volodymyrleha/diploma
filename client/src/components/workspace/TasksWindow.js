import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Window from './Window';
import TasksList from './TasksList';
import TaskCreateDialog from './TaskCreateDialog';
import TaskEditDialog from './TaskEditDialog';

export default function TasksWindow() {
    const classes = useStyles();
    const [isTaskCreateDialogOpen, setIsTaskCreateDialogOpen] = useState(false);
    const [isTaskEditDialogOpen, setIsTaskEditDialogOpen] = useState(false);
    const [tasksToRender, setTasksToRender] = useState({ todo: [], inProgress: [], done: [] });
    const tasks = useSelector(state => state.user.data ? state.user.data.tasks : []);
    const [taskToEdit, setTaskToEdit] = useState({});

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

    const openTaskEditDialog = (task) => {
        setTaskToEdit(task);
        setIsTaskEditDialogOpen(true);
    }

    const closeTaskEditDialog = () => {
        setIsTaskEditDialogOpen(false);
    }

    return (
        <>
            <Window>
                <Grid className={classes.container} container spacing={7}>
                    <Grid item xs={4}>
                        <TasksList 
                            header='Todo' 
                            tasks={tasksToRender.todo} 
                            openEditDialog={openTaskEditDialog}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TasksList 
                            header='In Progress' 
                            tasks={tasksToRender.inProgress} 
                            openEditDialog={openTaskEditDialog}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TasksList 
                            header='Done' 
                            tasks={tasksToRender.done} 
                            openEditDialog={openTaskEditDialog}
                        />
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
            <TaskEditDialog isOpen={isTaskEditDialogOpen} close={closeTaskEditDialog} task={taskToEdit} />
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
        width: '100%',
        overflowY: 'hidden',
        paddingTop: '2em',
        paddingLeft: "3em",
    }
});