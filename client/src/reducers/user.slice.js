import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api';

export const get = createAsyncThunk('user/get', async (payload, { rejectWithValue }) => {
    const res = await api.user.get();

    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const createNote = createAsyncThunk('user/createNote', async (payload, { rejectWithValue }) => {
    const res = await api.user.createNote(payload);
    
    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'idle',
        error: null
    },
    extraReducers: {
        [get.pending]: (state) => {
            state.data = null;
            state.status = 'pending';
            state.error = null;
        },
        [get.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'idle';
            state.error = null;
        },
        [get.rejected]: (state, action) => {
            state.data = null;
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [createNote.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [createNote.fulfilled]: (state, action) => {
            state.data.notes = state.data.notes.concat(action.payload);
            state.status = 'idle';
            state.error = null;
        },
        [createNote.rejected]: (state, action) => {
            state.status = 'idle';
            //state.error = action.payload.error;
        },
    },
});

export default userSlice.reducer;