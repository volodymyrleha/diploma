import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth.slice';
import useTextfield from '../../hooks/useTextfield';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Register({ openLogin }) {
    const dispatch = useDispatch();
    const name = useTextfield();
    const email = useTextfield();
    const password = useTextfield();
    const repeatPassword = useTextfield();

    return (
        <>
            <Typography variant='h4' component='h1'>
                Register
            </Typography>
            <form>
                <TextField value={ name.value } onChange={ name.handleChange } required label='Name' /><br/>
                <TextField value={ email.value } onChange={ email.handleChange } required label='Email' /><br/>
                <TextField value={ password.value } onChange={ password.handleChange } type='password' required label='Password' /><br />
                <TextField value={ repeatPassword.value } onChange={ repeatPassword.handleChange } type='password' required label='Repeat Password' />
            </form>
            <Button variant='contained' color='primary' onClick={ 
                () => { 
                    dispatch(register({
                        name: name.value,
                        email: email.value,
                        password: password.value
                    }));
                } 
            }>
                Register
            </Button>
            <Button onClick={ openLogin }>Login</Button>
        </>
    );
}