import type { AxiosInstance } from 'axios';

import DictsListStore from './model/dictsList.store.ts';
import DictCardStore from './model/dictCard.store.ts';
export { DictsListStore, DictCardStore };

import DictsList from './ui/DictsList.tsx';
import DictCard from './ui/DictCard.tsx';
export { DictsList, DictCard };

import createApi from './api/api.ts';
import createFakeApi from './api/fakeApi.ts';

const createDictApi = (httpPlugin: AxiosInstance) => {
    if (import.meta.env.DEV && Boolean(+import.meta.env.VITE_FAKEAPI_DICT)) return createFakeApi();
    return createApi(httpPlugin);
};

export { createDictApi };

export type { TDict } from './types/types.ts';
