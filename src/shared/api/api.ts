const baseURL = import.meta.env.VITE_URL_BASE;

interface getApi {
    endpoint: string;
    accessToken: string;
    getParams: object;
}

export async function apiGetItems({ endpoint, accessToken, getParams }: getApi) {
    let url = baseURL + endpoint;
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

interface addApi {
    endpoint: string;
    accessToken: string;
    itemData: object;
}

export async function apiAddItem({ endpoint, accessToken, itemData }: addApi) {
    const url = baseURL + endpoint;

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

export async function apiUpdItem({ endpoint, accessToken, itemID, itemData }: any) {
    const url = baseURL + endpoint + '/' + itemID;

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

export async function apiDelItem({ endpoint, accessToken, itemID }: any) {
    const url = baseURL + endpoint + '/' + itemID;

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
