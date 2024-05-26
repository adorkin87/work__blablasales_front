import type { AxiosInstance } from 'axios';
import type { TDict } from '../types/types.ts';

import { helperCreateAPI } from 'src/shared/api';

function createApi(httpClient: AxiosInstance) {
    return helperCreateAPI<TDict>(httpClient, import.meta.env.VITE_ENDPOINT_DICT);
}

export default createApi;
