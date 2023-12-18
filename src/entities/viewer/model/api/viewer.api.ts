const baseURL: string = import.meta.env.VITE_URL_BASE;

export async function apiLogin(login: string, password: string): Promise<object | false> {
    const url = baseURL + import.meta.env.VITE_ENDPOINT_AUTH + '/login';

    try {
        return await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ login, password })
        }).then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                console.error(`ERROR: code status - ${r.status}, message - ${r.statusText}`);
                return false;
            }
        });
    } catch (error) {
        console.error(`ERROR fetch: ${url} - ${error}`);
        return false;
    }
}

export async function apiLogout(accessToken: string): Promise<boolean> {
    const url = baseURL + import.meta.env.VITE_ENDPOINT_AUTH + '/logout';

    try {
        return await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json'
            },
            credentials: 'include'
        }).then((r) => {
            if (r.ok) {
                return true;
            } else {
                console.error(`ERROR: code status - ${r.status}, message - ${r.statusText}`);
                return false;
            }
        });
    } catch (error) {
        console.error(`ERROR fetch: ${url} - ${error}`);
        return false;
    }
}

export async function apiCheckToken(accessToken: string): Promise<object | false> {
    const url = baseURL + import.meta.env.VITE_ENDPOINT_AUTH + '/check';

    try {
        return await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json'
            },
            credentials: 'include'
        }).then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                console.error(`ERROR: code status - ${r.status}, message - ${r.statusText}`);
                return false;
            }
        });
    } catch (error) {
        console.error(`ERROR fetch: ${url} - ${error}`);
        return false;
    }
}
