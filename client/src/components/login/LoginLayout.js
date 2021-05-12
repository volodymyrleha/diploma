import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Login from './Login';
import Register from './Register';
import useTab from '../../hooks/useTab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    rootcontainer: {
        background: 'linear-gradient(147deg, rgba(89,80,237,1) 0%, rgba(145,80,237,1) 35%, rgba(237,80,218,1) 100%)',
        height: '100vh'
    },
    maincontainer: {
        height: '80vh',
        backgroundColor: 'white',
        padding: '0'
    },
    leftcontainer: {
        height: '80vh'
    },
    rightcontainer: {
        backgroundColor: 'rgba(89,80,237,0.3)',
        height: '80vh'
    }
}));

export default function LoginLayout() {
    const tabs = useTab('login');
    const classes = useStyles();

    return (
        <Grid className={ classes.rootcontainer } container justify='center' alignItems='center' >
            <Container className={ classes.maincontainer } maxWidth='lg'>
                <Grid container>
                    <Grid className={ classes.leftcontainer } item container lg={6} justify='center' alignItems='center' direction='column'>
                        {
                            tabs.current === 'login' ? 
                            <Login openRegister={ () => { tabs.changeTab('register'); } } /> : 
                            <Register openLogin={ () => { tabs.changeTab('login'); } } />                        
                        }
                    </Grid>
                    <Grid className={ classes.rightcontainer } item lg={6} />
                </Grid>
            </Container>
        </Grid>
    );
}