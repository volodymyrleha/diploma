import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: null,
        name: null,
        email: null,
        notes: [],
        events: [],
        tasks: [],
        status: 'idle',
        error: null
    },
    reducers: {
        updateUserData: (state, action) => { 
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.notes = action.payload.notes;
            state.events = action.payload.events;
            state.tasks = action.payload.tasks;
        }
    }
});

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;