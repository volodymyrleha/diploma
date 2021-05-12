import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/auth.slice';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';


export default function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <AppBar posiiton='fixed' className={classes.container}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Application Name
                </Typography>
                <Typography variant="h6" className={classes.username}>
                    User Name
                </Typography>
                <Button color="inherit" onClick={() => { dispatch(logout()); }}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles(() => ({
    container: {
        zIndex: 1201,    
    },
    title: {
        flexGrow: 1,
        marginLeft: '1em',
    },
    username: {
        marginRight: '2em',
    },
}));