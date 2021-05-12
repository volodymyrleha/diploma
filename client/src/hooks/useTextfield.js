import { useState } from 'react';

export default function useTextfield() {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return {
        value,
        handleChange
    }
}