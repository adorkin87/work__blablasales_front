import type { AxiosInstance } from 'axios';

import ScriptsListStore from './model/scriptsList.store.ts';

import createApi from './api/api.ts';
import createFakeApi from './api/fakeApi.ts';

const createScriptApi = (httpPlugin: AxiosInstance) => {
    if (import.meta.env.DEV && Boolean(+import.meta.env.VITE_FAKEAPI_SCRIPT)) return createFakeApi();
    return createApi(httpPlugin);
};

export { createScriptApi, ScriptsListStore };
