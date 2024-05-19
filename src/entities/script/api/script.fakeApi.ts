import { faker } from '@faker-js/faker/locale/ru';

import type { TDict, TScript } from '../types/types.ts';

import { FakeDBStore } from 'src/shared/api';
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

    const fakeDB = new FakeDBStore();
    fakeDB.endpoints.script = faker.helpers.multiple(() => createScriptMock(fakeDB.endpoints.dict), { count });

    return helperCreateFakeAPI<TScript, TDict>({ fakeDB, endpoint: 'script', delay });
}

export default createFakeApi;
