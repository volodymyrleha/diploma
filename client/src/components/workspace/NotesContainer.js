import React from 'react';
import Note from './Note';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default function NotesContainer() {
    const classes = useStyles();

    return (
        <Grid className={classes.container} container>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
            <Grid className={classes.item} item>
                <Note title='First Note' description='My first note that I added here' />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles({
    container: {
        padding: '0 3em',
    },
    item: {
        margin: '2em',
    }
});