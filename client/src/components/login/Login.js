import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth.slice';
import useTextfield from '../../hooks/useTextfield';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';

export default function Login({ openRegister }) {
    const dispatch = useDispatch();
    const email = useTextfield();
    const password = useTextfield();
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.header} variant='h4' component='h1'>
                Login
            </Typography>
            <form>
                <TextField 
                    className={classes.textfield} 
                    value={ email.value } 
                    onChange={ email.handleChange } 
                    required 
                    label='Email'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon color="disabled" />
                             </InputAdornment>
                            ),
                    }} 
                />
                <br/>
                <TextField 
                    className={classes.textfield} 
                    value={ password.value } 
                    onChange={ password.handleChange } 
                    required
                    type='password' 
                    label='Password' 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="disabled" />
                             </InputAdornment>
                            ),
                    }} 
                />
            </form>
            <Button className={classes.button} variant='contained' color='primary' onClick={ () => { dispatch(login({ email: email.value, password: password.value })) } }>
                Login
            </Button>
            <Button className={classes.buttonBottom} onClick={ openRegister }>Register</Button>
        </>
    );
}

const useStyles = makeStyles(() => ({
    header: {
        marginBottom: "1em",
        fontWeight: "bold",
        fontSize: "3em",
    },
    textfield: {
        marginBottom: "2em",
        width: "18em",
    },
    button: {
        margin: "2em 0",
        width: "8em",
    },
    buttonBottom: {
        margin: "0 0 4em 0",
    }
}));