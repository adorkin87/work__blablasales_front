import type { TAPIGetParams, TAPIResponse } from '../types/types.ts';

import getFakeItemsList from '../mocks/getFakeItemsList.ts';
import getFakeItemCard from '../mocks/getFakeItemCard.ts';
import addFakeItemCard from '../mocks/addFakeItemCard.ts';
import updFakeItemCard from '../mocks/updFakeItemCard.ts';
import delFakeItemCard from '../mocks/delFakeItemCard.ts';

type TConfig<T> = {
    fakeDB: { endpoints: Record<string, any[]> };
    endpoint: string;
    delay?: number | true;
    includes?: T[];
};

export default function helperCreateFakeAPI<T, I = undefined>({ fakeDB, endpoint, delay, includes }: TConfig<I>) {
    return {
        async all(getParams?: TAPIGetParams): Promise<TAPIResponse<T[], I>> {
            return getFakeItemsList<T>({
                fakeDB,
                endpoint,
                page: getParams?.page,
                perPage: getParams?.perPage,
                delay
            });
        },

        async one(id: string): Promise<TAPIResponse<T, I>> {
            return getFakeItemCard<T>({ fakeDB, endpoint, id, delay });
        },

        async add(payload: T): Promise<TAPIResponse<T, I>> {
            return addFakeItemCard<T>({ fakeDB, endpoint, payload, delay });
        },

        async upd(id: string, payload: Record<string, unknown>): Promise<TAPIResponse<T, I>> {
            return updFakeItemCard<T>({ fakeDB, endpoint, id, payload, delay });
        },

        async del(id: string): Promise<TAPIResponse<T, I>> {
            return delFakeItemCard<T>({ fakeDB, endpoint, id, delay });
        }
    };
}
