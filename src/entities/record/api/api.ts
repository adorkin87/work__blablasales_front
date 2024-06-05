import type { AxiosInstance } from 'axios';
import type { TRecord } from '../types/types.ts';
import type { TScript } from 'src/entities/script';
import type { TAgent } from 'src/entities/agent';

import { helperCreateAPI } from 'src/shared/api';

function createRecordApi(httpClient: AxiosInstance) {
    const api = helperCreateAPI<TRecord, TScript | TAgent>(httpClient, import.meta.env.VITE_ENDPOINT_RECORD);

    const add = async (payload: FormData) => {
        return (await httpClient.post(import.meta.env.VITE_ENDPOINT_RECORD, payload)).data;
    };

    return { ...api, add };
}

export default createRecordApi;
