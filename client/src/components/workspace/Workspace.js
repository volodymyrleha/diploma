import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get } from '../../features/user.slice';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CalenderWindow from './CalendarWindow';
import NotesWindow from './NotesWindow';
import TasksWindow from './TasksWindow';
import useTab from '../../hooks/useTab';

export default function Workspace() {
    const tabs = useTab('tasks');
    const dispatch = useDispatch();

    // FIXME: update user state when he is logged in or registered
    useEffect(() => {
        dispatch(get());
    // eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar />
            <Sidebar changeTab={ tabs.changeTab } currentTab={tabs.current} />
            {
                tabs.current === 'tasks' ?
                    <TasksWindow /> :
                tabs.current === 'calendar' ?
                    <CalenderWindow /> :
                <NotesWindow />
            }
        </>
    );
}