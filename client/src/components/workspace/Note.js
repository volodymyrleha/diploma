import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function Note({ title, description }) {
    const classes = useStyles();

    return (
        <Box className={ classes.note } component='div'>
            <Typography variant="h4" component="h3">
               { title }
            </Typography>
            <Typography variant="body1" component="p">
               { description }
            </Typography>
        </Box>
    );
}

const useStyles = makeStyles({
    note: {
        width: '20em',
        height: '18em',
        padding: '1em',
        backgroundColor: '#FFFF88',
    },
});