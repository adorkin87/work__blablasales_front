import calcDelay from '../lib/calcDelay.ts';

type TOptions = {
    fakeDB: { endpoints: Record<string, any[]> };
    endpoint: string;
    id: string;
    payload: Record<string, unknown>;
    delay?: number | true;
};

type TResponse<T> = {
    data: T;
};

export default async function <T>(options: TOptions): Promise<TResponse<T>> {
    const delayResponse = calcDelay(options.delay);

    return new Promise((resolve) => {
        setTimeout(() => {
            const updItem = options.fakeDB.endpoints[options.endpoint].find((item) => item.id === options.id);
            updItem.attributes = { ...updItem.attributes, ...options.payload.attributes! };

            const response = {
                data: updItem
            };

            console.log(response);

            resolve(response);
        }, delayResponse);
    });
}
