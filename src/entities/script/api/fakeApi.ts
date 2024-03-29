import type { TScript } from '../types/types.ts';

import { helperCreateFakeAPI } from 'src/shared/api';

import { createScriptMock } from '../mocks/createScript.mock.ts';

function createFakeApi() {
    const count = +import.meta.env.VITE_FAKEAPI_SCRIPT_COUNT;

    const delay =
        import.meta.env.VITE_FAKEAPI_SCRIPT_DELAY === 'true'
            ? true
            : parseInt(import.meta.env.VITE_FAKEAPI_SCRIPT_DELAY)
              ? parseInt(import.meta.env.VITE_FAKEAPI_SCRIPT_DELAY)
              : undefined;

    return helperCreateFakeAPI<TScript>(createScriptMock, { count, delay });
}

export default createFakeApi;
