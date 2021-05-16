import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Task from './Task';

export default function TasksList({ header, tasks }) {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.header} variant="h4" component="h2">
                { header }
            </Typography>
            <GridList className={classes.container} cellHeight={160} cols={1}>
                {
                    tasks.map(item => 
                        <GridListTile key={item._id} cols={1}>
                            <Task id={item._id} title={item.title} description={item.description} />
                        </GridListTile>
                    )
                }
            </GridList>
        </>
    );
}

const useStyles = makeStyles({
    container: {
        backgroundColor: '#F5F5F5',
        overflowY: 'auto',
        height: '80vh',
    },
    header: {
        marginBottom: '0.8em',
    }
});