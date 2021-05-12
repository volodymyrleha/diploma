import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get } from '../../reducers/user.slice';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import HomeWindow from './HomeWindow';
import CalenderWindow from './CalendarWindow';
import NotesWindow from './NotesWindow';
import TasksWindow from './TasksWindow';
import useTab from '../../hooks/useTab';

export default function Workspace() {
    const tabs = useTab('home');
    const dispatch = useDispatch();

    // FIXME: update user state when he is logged in or registered
    useEffect(() => {
        dispatch(get());
    }, []);

    return (
        <>
            <Navbar />
            <Sidebar changeTab={ tabs.changeTab } />
            {
                tabs.current === 'home' ? 
                    <HomeWindow /> :
                tabs.current === 'tasks' ?
                    <TasksWindow /> :
                tabs.current === 'calendar' ?
                    <CalenderWindow /> :
                <NotesWindow />
            }
        </>
    );
}