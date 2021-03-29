module.exports = password => {
    if (password.length < 8)
        return false;

    const numberRegex = /[0-9]/;
    if (!password.match(numberRegex))
        return false;

    const capitalizedRegex = /([A-Z]|[А-Я])/;
    if (!password.match(capitalizedRegex))
        return false;

    const lowerCaseRegex = /([a-z]|[а-я])/;
    if (!password.match(lowerCaseRegex))
        return false;

    return true;
}