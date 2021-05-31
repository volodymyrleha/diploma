import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth.slice';
import useTextfield from '../../hooks/useTextfield';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';

export default function Register({ openLogin }) {
    const dispatch = useDispatch();
    const name = useTextfield();
    const email = useTextfield();
    const password = useTextfield();
    const repeatPassword = useTextfield();
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.header} variant='h4' component='h1'>
                Register
            </Typography>
            <form>
                <TextField 
                    className={classes.textfield}
                    value={ name.value } 
                    onChange={ name.handleChange } 
                    required label='Name' 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaceIcon color="disabled" />
                             </InputAdornment>
                            ),
                    }} 
                />
                <br/>
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
                    type='password' 
                    required 
                    label='Password'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="disabled" />
                             </InputAdornment>
                            ),
                    }} 
                />
                <br />
                <TextField 
                    className={classes.textfield}
                    value={ repeatPassword.value } 
                    onChange={ repeatPassword.handleChange } 
                    type='password' 
                    required 
                    label='Repeat Password' 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="disabled" />
                             </InputAdornment>
                            ),
                    }} 
                />
            </form>
            <Button 
                className={classes.button} 
                variant='contained' 
                color='primary' 
                onClick={ 
                    () => { 
                        dispatch(register({
                            name: name.value,
                            email: email.value,
                            password: password.value
                        }));
                    } 
                }
            >
                Register
            </Button>
            <Button className={classes.buttonBottom} onClick={ openLogin }>Login</Button>
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
        margin: "0",
    }
}));