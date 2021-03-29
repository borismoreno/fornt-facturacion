const baseUrl = process.env.REACT_APP_API_URL;
export const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    // return fetch( url ,{
    //     method,
    //     headers: {
    //         'x-auth-token': token
    //     }
    // }).then(response => {
    //     if (!response.ok) {
    //         return response.json()
    //             .catch(() => {
    //                 throw new Error(response.status);
    //             })
    //             .then(({msg}) => {
    //                 throw new Error(msg || response.status);
    //             })
    //     }
    //     return response.json();
    // }).catch(err => {
    //     console.log('Error fetch', err);
    // });
    try {
        if ( method === 'GET' ) {
            return fetch( url ,{
                method,
                headers: {
                    'x-auth-token': token
                }
            });
        } else {
            return fetch( url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(data)
            });
        }
    } catch (error) {
        console.log('Error token', error);
    }
}