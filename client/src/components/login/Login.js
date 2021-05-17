import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth.slice';
import useTextfield from '../../hooks/useTextfield';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Login({ openRegister }) {
    const dispatch = useDispatch();
    const email = useTextfield();
    const password = useTextfield();

    return (
        <>
            <Typography variant='h4' component='h1'>
                Login
            </Typography>
            <form>
                <TextField value={ email.value } onChange={ email.handleChange } required label='Email' /><br/>
                <TextField value={ password.value } onChange={ password.handleChange } required type='password' label='Password' />
            </form>
            <Button variant='contained' color='primary' onClick={ () => { dispatch(login({ email: email.value, password: password.value })) } }>
                Login
            </Button>
            <Button onClick={ openRegister }>Register</Button>
        </>
    );
}