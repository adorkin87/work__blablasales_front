import type { AxiosInstance } from 'axios';

import { createRecordApi } from 'src/entities/record';
import { createAgentApi } from 'src/entities/agent';
import { createDictApi, createScriptApi } from 'src/entities/script';

function createApi(httpPlugin: AxiosInstance) {
    return {
        // auth: createAuthApi(httpPlugin),
        agent: createAgentApi(httpPlugin),
        dict: createDictApi(httpPlugin),
        script: createScriptApi(httpPlugin),
        record: createRecordApi(httpPlugin)
    };
}

export default createApi;

export type TApiInstance = ReturnType<typeof createApi>;
