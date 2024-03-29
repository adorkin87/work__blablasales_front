import type { TAPIResponseMeta } from '../types/types.ts';

import calcDelay from '../lib/calcDelay.ts';

type TOptions = {
    fakeDB: { endpoints: Record<string, any[]> };
    endpoint: string;
    page?: number;
    perPage?: number;
    delay?: number | true;
};

type TResponse<T> = {
    data: T[];
    meta: TAPIResponseMeta;
};

export default async function <T>(options: TOptions): Promise<TResponse<T>> {
    const delayResponse = calcDelay(options.delay);
    const allCount = options.fakeDB.endpoints[options.endpoint].length;

    //считаем срез
    const start = options.page ? (options.page - 1) * (options.perPage ? options.perPage : 0) : 0;
    const end = options.perPage ? (options.page ? options.page * options.perPage : options.perPage) : undefined;

    return new Promise((resolve) => {
        console.log(options.fakeDB.endpoints[options.endpoint]);
        setTimeout(() => {
            const response = {
                data: options.fakeDB.endpoints[options.endpoint].slice(start, end),
                meta: { count: allCount }
            };

            console.log(response);

            resolve(response);
        }, delayResponse);
    });
}
