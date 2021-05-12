const apicall = (endpoint, method = 'GET', body = {}, token = null) => {
    return new Promise(async (resolve, reject) => {
        method = method.toUpperCase();

        const requestOptions = {
            method: method,
            headers: {}
        }

        if (method !== 'GET') {
            requestOptions.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            requestOptions.body = JSON.stringify(body);
        }    

        if (token)
            requestOptions.headers['Authorization'] = `Bearer ${ token }`;

        try {
            const res = await fetch(endpoint, requestOptions);
            const data = await res.json();

            resolve({
                status: res.status,
                data: data
            });

        } catch (err) {
            reject(err);
        }
    });
}

export default apicall;