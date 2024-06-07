import { http, delay, HttpResponse } from 'msw';
import { helperCreateHandlersMockApi } from 'src/shared/api';
import { TScript } from 'src/entities/script';

const delayResponse =
    import.meta.env.VITE_FAKEAPI_SCRIPT_DELAY === 'real' ? 'real' : parseInt(import.meta.env.VITE_FAKEAPI_SCRIPT_DELAY);

const createScriptHandlers = (fakeDB: { endpoints: Record<string, any[]> }) => {
    return [
        ...helperCreateHandlersMockApi({
            fakeDB,
            apiEndpoint: import.meta.env.VITE_ENDPOINT_SCRIPT,
            dbEndpoint: 'script',
            delayResponse,
            methods: ['add', 'one', 'upd', 'del']
        }),

        http.get(import.meta.env.VITE_ENDPOINT_SCRIPT, async () => {
            await delay(delayResponse);

            const idsDict = new Set<string>();

            for (let script of fakeDB.endpoints.script as TScript[]) {
                for (let kev of script.attributes.kev) {
                    idsDict.add(kev.id);
                }
                for (let marker of script.attributes.marker) {
                    idsDict.add(marker.id);
                }
                for (let objection of script.attributes.objection) {
                    idsDict.add(objection.id);
                }
            }

            return HttpResponse.json({
                data: fakeDB.endpoints.script,
                included: fakeDB.endpoints.dict.filter((dict) => idsDict.has(dict.id)),
                meta: { count: fakeDB.endpoints.script.length }
            });
        })
    ];
};

export default createScriptHandlers;
