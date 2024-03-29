import type { AxiosInstance } from 'axios';

import type { TScript } from '../types/types.ts';

import { helperCreateAPI } from 'src/shared/api';

function createApi(httpClient: AxiosInstance) {
    return helperCreateAPI<TScript>(httpClient, import.meta.env.VITE_ENDPOINT_SCRIPT);
}

export default createApi;
