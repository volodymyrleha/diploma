import { useState } from 'react';

export default function useTextfield(params) {
    let initValue = typeof params?.value !== 'undefined' ? params.value : params?.isDate ? new Date() : '';
    const [value, setValue] = useState(initValue);

    const handleChange = (e) => {
        setValue(params?.isDate ? e : e.target.value);
    }

    return {
        value,
        handleChange,
        setValue,
    }
}