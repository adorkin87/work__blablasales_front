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
            const page = Number(url.searchParams.get('page[offset]'));
            const perPage = Number(url.searchParams.get('page[limit]'));
            const agentID = url.searchParams.get('filter[agent]');

            const filteredRecords = fakeDB.endpoints.record.filter((record) =>
                agentID ? record.relationships.agent.data.id === agentID : true
            );

            const start = page ? (page - 1) * (perPage ? perPage : 0) : 0;
            const end = perPage ? (page ? page * perPage : perPage) : undefined;

            const idsAgent = new Set<string>();
            for (let record of filteredRecords) {
                idsAgent.add(record.relationships.agent.data.id);
            }
            const idsScript = new Set<string>();
            for (let record of filteredRecords) {
                idsScript.add(record.relationships.script.data.id);
            }

            return HttpResponse.json({
                data: filteredRecords
                    // .filter((record) => (agentID ? record.relationships.agent.data.id === agentID : true))
                    .slice(start, end),
                included: [
                    ...fakeDB.endpoints.agent.filter((agent) => idsAgent.has(agent.id)),
                    ...fakeDB.endpoints.script.filter((script) => idsScript.has(script.id))
                ],
                meta: { count: filteredRecords.length }
            });
        }),

        http.post(import.meta.env.VITE_ENDPOINT_RECORD, async ({ request }) => {
            await delay(delayResponse);

            const data = await request.formData();
            const file = data.get('file');

            return HttpResponse.json({ data: file!.name });
            // return HttpResponse.json({ data: file });
        })
    ];
};

export default createRecordHandlers;
