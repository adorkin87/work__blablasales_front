import { http, delay, HttpResponse } from 'msw';
import { helperCreateHandlersMockApi } from 'src/shared/api';

const delayResponse =
    import.meta.env.VITE_FAKEAPI_RECORD_DELAY === 'real' ? 'real' : parseInt(import.meta.env.VITE_FAKEAPI_RECORD_DELAY);

const createRecordHandlers = (fakeDB: { endpoints: Record<string, any[]> }) => {
    return [
        ...helperCreateHandlersMockApi({
            fakeDB,
            apiEndpoint: import.meta.env.VITE_ENDPOINT_RECORD,
            dbEndpoint: 'record',
            delayResponse,
            methods: ['del']
        }),

        http.get(import.meta.env.VITE_ENDPOINT_RECORD, async ({ request }) => {
            await delay(delayResponse);

            const url = new URL(request.url);
            const page = Number(url.searchParams.get('page'));
            const perPage = Number(url.searchParams.get('perPage'));
            const start = page ? (page - 1) * (perPage ? perPage : 0) : 0;
            const end = perPage ? (page ? page * perPage : perPage) : undefined;

            const idsAgent = new Set<string>();
            for (let record of fakeDB.endpoints.record) {
                idsAgent.add(record.relationships.agent.data.id);
            }
            const idsScript = new Set<string>();
            for (let record of fakeDB.endpoints.record) {
                idsScript.add(record.relationships.script.data.id);
            }

            return HttpResponse.json({
                data: fakeDB.endpoints.record.slice(start, end),
                included: [
                    ...fakeDB.endpoints.agent.filter((agent) => idsAgent.has(agent.id)),
                    ...fakeDB.endpoints.script.filter((script) => idsScript.has(script.id))
                ],
                meta: { count: fakeDB.endpoints.record.length }
            });
        })
    ];
};

export default createRecordHandlers;
