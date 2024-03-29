import { faker } from '@faker-js/faker/locale/ru';

import type { TRecord } from '../types/types.ts';

import { FakeDBStore } from 'src/shared/api';
import { createRecordMock } from '../mocks/createRecord.mock.ts';

import { helperCreateFakeAPI } from 'src/shared/api';

function createFakeApi() {
    const count = +import.meta.env.VITE_FAKEAPI_RECORD_COUNT;
    const delay =
        import.meta.env.VITE_FAKEAPI_RECORD_DELAY === 'true'
            ? true
            : parseInt(import.meta.env.VITE_FAKEAPI_AGENT_DELAY)
              ? parseInt(import.meta.env.VITE_FAKEAPI_AGENT_DELAY)
              : undefined;

    const fakeDB = new FakeDBStore();
    fakeDB.endpoints.record = faker.helpers.multiple(createRecordMock, { count });

    return helperCreateFakeAPI<TRecord>({ fakeDB, endpoint: 'record', delay });
}

export default createFakeApi;
