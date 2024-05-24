import { AxiosInstance } from 'axios';

import type { TRecord } from '../types/types.ts';

import { helperCreateAPI } from 'src/shared/api';

function createRecordApi(httpClient: AxiosInstance) {
    return helperCreateAPI<TRecord>(httpClient, import.meta.env.VITE_ENDPOINT_RECORD);
}

export default createRecordApi;
