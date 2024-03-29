import { faker } from '@faker-js/faker/locale/ru';

import calcDelay from '../lib/calcDelay.ts';

type TOptions<T> = {
    fakeDB: { endpoints: Record<string, any[]> };
    endpoint: string;
    payload: T;
    delay?: number | true;
};

type TResponse<T> = {
    data: T;
};

export default async function <T>(options: TOptions<T>): Promise<TResponse<T>> {
    const delayResponse = calcDelay(options.delay);

    return new Promise((resolve) => {
        setTimeout(() => {
            const newID = String(faker.number.int());
            const newItem: T = { ...options.payload, id: newID };

            options.fakeDB.endpoints[options.endpoint].push(newItem);

            const response = {
                data: newItem
            };

            console.log(response);

            resolve(response);
        }, delayResponse);
    });
}
