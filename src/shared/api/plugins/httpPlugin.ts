import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

function createHttpPlugin() {
    const httpClient = axios.create({
        baseURL: import.meta.env.VITE_BACK_URL,
        timeout: 10000
    });

    httpClient.interceptors.response.use(handleResponse, handleError);

    function handleResponse(response: AxiosResponse) {
        import.meta.env.DEV && console.log(response);
        return response;
    }

    function handleError(error: AxiosError) {
        import.meta.env.DEV && console.error(error);
        if (error.response && error.response.status >= 400 && error.response.status < 500)
            toast.error('Ошибка в запросе на сервер', { autoClose: false, theme: 'colored' });
        if (error.response && error.response.status >= 500)
            toast.error('На сервере произошла ошибка', { autoClose: false, theme: 'colored' });
        return error;
    }

    return httpClient;
}

export default createHttpPlugin;
