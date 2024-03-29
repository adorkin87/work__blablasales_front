import calcDelay from '../lib/calcDelay.ts';

type TOptions = {
    fakeDB: { endpoints: Record<string, any[]> };
    endpoint: string;
    id: string;
    delay?: number | true;
};

type TResponse<T> = {
    data: T;
};

export default async function <T>(options: TOptions): Promise<TResponse<T>> {
    const delayResponse = calcDelay(options.delay);

    return new Promise((resolve) => {
        setTimeout(() => {
            const response = {
                data: options.fakeDB.endpoints[options.endpoint].find((item) => item.id === options.id)
            };

            console.log(response);

            resolve(response);
        }, delayResponse);
    });
}
