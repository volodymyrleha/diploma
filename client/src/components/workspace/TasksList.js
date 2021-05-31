import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Task from './Task';

export default function TasksList({ header, tasks, openEditDialog }) {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.header} variant="h4" component="h2">
                { header }
            </Typography>
            <Grid className={classes.container} cols={1}>
                {
                    tasks.map(item => 
                        <Task 
                            key={item._id}
                            id={item._id} 
                            title={item.title} 
                            description={item.description} 
                            state={item.state}
                            labels={item.labels}
                            openEditDialog={openEditDialog}
                        />
                    )
                }
            </Grid>
        </>
    );
}

const useStyles = makeStyles({
    container: {
        backgroundColor: '#F5F5F5',
        overflowY: 'auto',
        height: '74vh',
        border: "1.2em solid #F5F5F5"
    },
    header: {
        marginBottom: '0.8em',
        fontWeight: "500",
    }
});