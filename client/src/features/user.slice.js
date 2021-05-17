import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api';

// FIXME: need to add a pattern, lots of similar code...
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

export const updateNote = createAsyncThunk('user/updateNote', async (payload, { rejectWithValue }) => {
    const res = await api.user.updateNote(payload.id, payload.body);
    
    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});


export const deleteNote = createAsyncThunk('user/deleteNote', async (id, { rejectWithValue }) => {
    const res = await api.user.deleteNote(id);
    
    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const createTask = createAsyncThunk('user/createTask', async (payload, { rejectWithValue }) => {
    const res = await api.user.createTask(payload);
    
    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const updateTask = createAsyncThunk('user/updateTask', async (payload, { rejectWithValue }) => {
    const res = await api.user.updateTask(payload.id, payload.body);
    
    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

// FIXME?: test if id and payload will work together
export const updateTaskState = createAsyncThunk('user/updateTaskState', async (id, payload, { rejectWithValue }) => {
    const res = await api.user.updateTaskState(id, payload);
    
    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const deleteTask = createAsyncThunk('user/deleteTask', async (id, { rejectWithValue }) => {
    const res = await api.user.deleteTask(id);
    
    if (res.status >= 300)
        return rejectWithValue(res.data);
    else 
        return res.data;
});

export const createEvent = createAsyncThunk('user/createEvent', async (payload, { rejectWithValue }) => {
    const res = await api.user.createEvent(payload);
    
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
            state.error = action.payload.error;
        },
        [updateNote.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [updateNote.fulfilled]: (state, action) => {
            state.data.notes = state.data.notes.map(note => { 
                if (note._id === action.payload._id)
                    return action.payload;
                else
                    return note;
            });
            state.status = 'idle';
            state.error = null;
        },
        [updateNote.rejected]: (state, action) => {
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [deleteNote.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.data.notes = action.payload;
            state.status = 'idle';
            state.error = null;
        },
        [deleteNote.rejected]: (state, action) => {
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [createTask.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [createTask.fulfilled]: (state, action) => {
            state.data.tasks = state.data.tasks.concat(action.payload);
            state.status = 'idle';
            state.error = null;
        },
        [createTask.rejected]: (state, action) => {
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [updateTask.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [updateTask.fulfilled]: (state, action) => {
            state.data.tasks = state.data.tasks.map(task => { 
                if (task._id === action.payload._id)
                    return action.payload;
                else
                    return task;
            });
            state.status = 'idle';
            state.error = null;
        },
        [updateTask.rejected]: (state, action) => {
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [deleteTask.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.data.tasks = action.payload;
            state.status = 'idle';
            state.error = null;
        },
        [deleteTask.rejected]: (state, action) => {
            state.status = 'idle';
            state.error = action.payload.error;
        },
        [createEvent.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [createEvent.fulfilled]: (state, action) => {
            state.data.events = state.data.events.concat(action.payload);
            state.status = 'idle';
            state.error = null;
        },
        [createEvent.rejected]: (state, action) => {
            state.status = 'idle';
            state.error = action.payload.error;
        },
    },
});

export default userSlice.reducer;