import { faker } from '@faker-js/faker/locale/ru';

import type { TDict } from '../types/types.ts';

import { FakeDBStore } from 'src/shared/api';
import { helperCreateFakeAPI } from 'src/shared/api';

import { createDictMock } from '../mocks/createDict.mock.ts';

function createFakeApi() {
    const count = +import.meta.env.VITE_FAKEAPI_DICT_COUNT;
    const delay =
        import.meta.env.VITE_FAKEAPI_DICT_DELAY === 'true'
            ? true
            : parseInt(import.meta.env.VITE_FAKEAPI_DICT_DELAY)
              ? parseInt(import.meta.env.VITE_FAKEAPI_DICT_DELAY)
              : undefined;

    const fakeDB = new FakeDBStore();
    fakeDB.endpoints.dict = faker.helpers.multiple(createDictMock, { count });

    return helperCreateFakeAPI<TDict>({ fakeDB, endpoint: 'dict', delay });
}

export default createFakeApi;
