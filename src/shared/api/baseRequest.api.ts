export async function apiGetItems(url: string, accessToken: string, getParams?: object): Promise<object | false> {
    if (getParams) {
        url += '?';
        Object.entries(getParams).forEach((param) => (url += `${param[0]}=${param[1]}&`));
        url = url.slice(0, -1);
    }

    try {
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json'
            }
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

export async function apiAddItem(url: string, accessToken: string, itemData: object): Promise<object | false> {
    try {
        return fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
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

export async function apiUpdItem(url: string, accessToken: string, itemData: object): Promise<object | false> {
    try {
        return fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
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

export async function apiDelItem(url: string, accessToken: string): Promise<object | false> {
    try {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json'
            }
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
