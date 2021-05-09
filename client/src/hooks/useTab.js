import { useState } from 'react';

export default function useTab(initTab) {
    const [tab, setTab] = useState(initTab);

    const changeTab = (newTab) => {
        setTab(newTab);
    }

    return {
        current: tab,
        changeTab
    }
}