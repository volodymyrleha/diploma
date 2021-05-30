import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../features/auth.slice';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';


export default function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.user.data?.name);

    return (
        <AppBar posiiton='fixed' className={classes.container}>
            <Toolbar>
                <FaceIcon />
                <Typography variant="h6" className={classes.title}>
                    { userName }
                </Typography>
                <Button 
                    color="inherit" 
                    onClick={() => { dispatch(logout()); }}
                    endIcon={<ExitToAppIcon />}
                >
                    Logout
                </Button>
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
}));