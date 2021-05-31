import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api';
import * as storage from '../utils/storage';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    const res = await api.auth.login(payload);

    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const register = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    const res = await api.auth.register(payload);

    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: storage.get('token'),
        status: 'idle',
        error: null
    },
    reducers: {
        logout: state => {
            storage.remove('token');
            state.token = null;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.token = null;
            state.status = 'pending';
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            storage.save('token', action.payload.token);
            state.token = action.payload.token;
            state.status = 'idle';
            state.error = null;
        },
        [login.rejected]: (state, action) => {
            state.token = null;
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [register.pending]: (state) => {
            state.token = null;
            state.status = 'pending';
            state.error = null;
        },
        [register.fulfilled]: (state, action) => {
            storage.save('token', action.payload.token);
            state.token = action.payload.token;
            state.status = 'idle';
            state.error = null;
        },
        [register.rejected]: (state, action) => {
            state.token = null;
            state.status = 'idle';
            state.error = action.payload.error;
        }
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;