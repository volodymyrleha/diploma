import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

export default function Window({ children }) {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            { children }
        </Box>
    );
}

const useStyles = makeStyles({
    container: {
        paddingLeft: '15em',
        paddingTop: '4em',
    },
});