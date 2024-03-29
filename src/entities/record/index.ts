import type { AxiosInstance } from 'axios';

import RecordsListStore from './model/recordsList.store.ts';

import createApi from './api/api.ts';
import createFakeApi from './api/fakeApi.ts';

const createRecordApi = (httpPlugin: AxiosInstance) => {
    if (import.meta.env.DEV && Boolean(+import.meta.env.VITE_FAKEAPI_RECORD)) return createFakeApi();
    return createApi(httpPlugin);
};

export { createRecordApi, RecordsListStore };

import type { TRecord } from './types/types.ts';
export type { TRecord };
