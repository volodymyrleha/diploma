import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api';

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
        token: null,
        status: 'idle',
        error: null
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.token = null;
            state.status = 'pending';
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.status = 'idle';
            state.error = null;
        },
        [login.rejected]: (state, action) => {
            state.token = null;
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [register.pending]: (state, action) => {
            state.token = null;
            state.status = 'pending';
            state.error = null;
        },
        [register.fulfilled]: (state, action) => {
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

export default authSlice.reducer;