import type { AxiosInstance } from 'axios';

import DictsListStore from './model/dictsList.store.ts';
import DictCardStore from './model/dictCard.store.ts';
import ScriptsListStore from './model/scriptsList.store.ts';
export { DictsListStore, DictCardStore, ScriptsListStore };

import DictsList from './ui/DictsList.tsx';
import DictCard from './ui/DictCard.tsx';
export { DictsList, DictCard };

import DictApi from './api/dict.api.ts';
import DickFakeApi from './api/dict.fakeApi.ts';
const createDictApi = (httpPlugin: AxiosInstance) => {
    if (import.meta.env.DEV && Boolean(+import.meta.env.VITE_FAKEAPI_DICT)) return DickFakeApi();
    return DictApi(httpPlugin);
};

import ScriptApi from './api/script.api.ts';
import ScriptFakeApi from './api/script.fakeApi.ts';
const createScriptApi = (httpPlugin: AxiosInstance) => {
    if (import.meta.env.DEV && Boolean(+import.meta.env.VITE_FAKEAPI_SCRIPT)) return ScriptFakeApi();
    return ScriptApi(httpPlugin);
};

export { createDictApi, createScriptApi };

export type { TDict, TScript } from './types/types.ts';
