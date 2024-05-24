import { http, delay, HttpResponse, HttpHandler } from 'msw';
import { faker } from '@faker-js/faker/locale/ru';

type TMethod = 'list' | 'one' | 'add' | 'upd' | 'del';

interface IProps {
    fakeDB: { endpoints: Record<string, any[]> };
    apiEndpoint: string;
    dbEndpoint: string;
    delayResponse: number | 'real';
    methods?: TMethod[];
}

const helperCreateHandlersMockApi = ({
    fakeDB,
    apiEndpoint,
    dbEndpoint,
    delayResponse,
    methods
}: IProps): HttpHandler[] => {
    const handlers = {
        list: http.get(apiEndpoint, async ({ request }) => {
            await delay(delayResponse);

            const url = new URL(request.url);
            const page = Number(url.searchParams.get('page'));
            const perPage = Number(url.searchParams.get('perPage'));
            const start = page ? (page - 1) * (perPage ? perPage : 0) : 0;
            const end = perPage ? (page ? page * perPage : perPage) : undefined;

            return HttpResponse.json({
                data: fakeDB.endpoints[dbEndpoint].slice(start, end),
                meta: { count: fakeDB.endpoints[dbEndpoint].length }
            });
        }),

        one: http.get(`${apiEndpoint}/:id`, async ({ params }) => {
            await delay(delayResponse);

            const { id } = params;

            return HttpResponse.json({
                data: fakeDB.endpoints[dbEndpoint].find((item) => item.id === id)
            });
        }),

        add: http.post(apiEndpoint, async ({ request }) => {
            await delay(delayResponse);

            const payload = (await request.json()) as object;
            const newID = String(faker.number.int());
            const newItem = { id: newID, ...payload };

            fakeDB.endpoints[dbEndpoint].push({ id: newID, ...payload });

            return HttpResponse.json({
                data: newItem
            });
        }),

        upd: http.patch(`${apiEndpoint}/:id`, async ({ request, params }) => {
            await delay(delayResponse);

            const { id } = params;
            const payload = (await request.json()) as Record<string, unknown>;
            const updItem = fakeDB.endpoints[dbEndpoint].find((item) => item.id === id);
            updItem.attributes = { ...updItem.attributes, ...payload.attributes! };

            return HttpResponse.json({
                data: updItem
            });
        }),

        del: http.delete(`${apiEndpoint}/:id`, async ({ params }) => {
            await delay(delayResponse);

            const { id } = params;
            const delItem = fakeDB.endpoints.agent.find((item) => item.id === id);
            fakeDB.endpoints[dbEndpoint] = fakeDB.endpoints[dbEndpoint].filter((item) => item.id !== id);

            return HttpResponse.json({
                data: delItem
            });
        })
    };

    if (!methods || methods.length === 0) {
        return Object.values(handlers);
    }

    const result: HttpHandler[] = [];
    methods.forEach((method) => {
        result.push(handlers[method]);
    });
    return result;
};

export default helperCreateHandlersMockApi;
