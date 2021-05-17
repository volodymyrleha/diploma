export const get = (key) => {
    return localStorage.getItem(key);
}

export const save = (key, data) => {
    return localStorage.setItem(key, data);
}

export const remove = (key) => {
    return localStorage.removeItem(key);
}