export async function apiUploadAudio(url: string, accessToken: string, formData: FormData): Promise<object | false> {
    try {
        return fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                Accept: 'application/json'
            },
            body: formData
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
