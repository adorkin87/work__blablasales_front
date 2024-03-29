import type { AxiosInstance } from 'axios';

import { createRecordApi } from 'src/entities/record';
import { createAgentApi } from 'src/entities/agent';
import { createDictApi } from 'src/entities/dict';
import { createScriptApi } from 'src/entities/script';

function createApi(httpPlugin: AxiosInstance) {
    return {
        // auth: createAuthApi(httpPlugin),
        record: createRecordApi(httpPlugin),
        agent: createAgentApi(httpPlugin),
        script: createScriptApi(httpPlugin),
        dict: createDictApi(httpPlugin)
    };
}

export default createApi;

export type TApiInstance = ReturnType<typeof createApi>;
