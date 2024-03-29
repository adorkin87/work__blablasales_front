import type { AxiosInstance } from 'axios';

import type { TAgent } from '../types/types.ts';

import { helperCreateAPI } from 'src/shared/api';

function createApi(httpClient: AxiosInstance) {
    return helperCreateAPI<TAgent>(httpClient, import.meta.env.VITE_ENDPOINT_AGENT);
}

export default createApi;
