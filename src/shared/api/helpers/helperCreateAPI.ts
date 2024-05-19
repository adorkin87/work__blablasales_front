import type { AxiosInstance } from 'axios';

import type { TAPIGetParams, TAPIResponse } from '../types/types.ts';

import convertGetParams from '../lib/convertGetParams.ts';

export default function helperCreateAPI<T, I = undefined>(httpClient: AxiosInstance, endpoint: string) {
    return {
        async all(getParams?: TAPIGetParams) {
            return (await httpClient.get<TAPIResponse<T[], I>>(`${endpoint}${convertGetParams(getParams)}`)).data;
        },

        async one(id: string) {
            return (await httpClient.get<TAPIResponse<T, I>>(`${endpoint}/${id}`)).data;
        },

        async add(payload: T) {
            return (await httpClient.post<TAPIResponse<T, I>>(endpoint, { ...payload })).data;
        },

        async upd(id: string, payload: Record<string, unknown>) {
            return (await httpClient.patch<TAPIResponse<T, I>>(`${endpoint}/${id}`, { ...payload })).data;
        },

        async del(id: string) {
            return (await httpClient.delete<TAPIResponse<T, I>>(`${endpoint}/${id}`)).data;
        }
    };

    // const result = methods.reduce<Record<TMethods, () => Promise<TAPIResponse<T>>>>(
    //     (res, method: TMethods) => ({ ...res, [method]: allMethods[method] }),
    //     {}
    // );
}
