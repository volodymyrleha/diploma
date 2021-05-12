import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import HomeWindow from './HomeWindow';
import CalenderWindow from './CalendarWindow';
import NotesWindow from './NotesWindow';
import TasksWindow from './TasksWindow';
import useTab from '../../hooks/useTab';

export default function Workspace() {
    const tabs = useTab('home');

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