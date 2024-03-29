import { faker } from '@faker-js/faker/locale/ru';

import type { TAgent } from '../types/types.ts';

import { FakeDBStore } from 'src/shared/api';
import { createAgentMock } from '../mocks/createAgent.mock.ts';

import { helperCreateFakeAPI } from 'src/shared/api';

function createFakeApi() {
    const count = +import.meta.env.VITE_FAKEAPI_AGENT_COUNT;
    const delay =
        import.meta.env.VITE_FAKEAPI_AGENT_DELAY === 'true'
            ? true
            : parseInt(import.meta.env.VITE_FAKEAPI_AGENT_DELAY)
              ? parseInt(import.meta.env.VITE_FAKEAPI_AGENT_DELAY)
              : undefined;

    const fakeDB = new FakeDBStore();
    fakeDB.endpoints.agent = faker.helpers.multiple(createAgentMock, { count });

    return helperCreateFakeAPI<TAgent>({ fakeDB, endpoint: 'agent', delay });
}

export default createFakeApi;
