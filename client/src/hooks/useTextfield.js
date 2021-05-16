import { useState } from 'react';

export default function useTextfield(params) {
    const [value, setValue] = useState(params?.isDate ? new Date() : '');

    const handleChange = (e) => {
        setValue(params?.isDate ? e : e.target.value);
    }

    return {
        value,
        handleChange
    }
}