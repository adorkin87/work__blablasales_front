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

interface ApiAddItem {
    url: string;
    accessToken: string;
    itemData: object;
}

export async function apiAddItem({ url, accessToken, itemData }: ApiAddItem): Promise<object | false> {
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

interface ApiUpdItem {
    url: string;
    accessToken: string;
    itemData: object;
}

export async function apiUpdItem({ url, accessToken, itemData }: ApiUpdItem): Promise<object | false> {
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

interface ApiDelItem {
    url: string;
    accessToken: string;
}

export async function apiDelItem({ url, accessToken }: ApiDelItem): Promise<object | false> {
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
