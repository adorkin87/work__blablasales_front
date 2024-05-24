import { setupWorker } from 'msw/browser';
import { faker } from '@faker-js/faker/locale/ru';

import type { HttpHandler } from 'msw';

import FakeDBStore from './fakeDB.store.ts';

import { createAgentMock, createAgentHandlers } from 'src/entities/agent';
import { createDictMock, createDictHandlers, createScriptMock, createScriptHandlers } from 'src/entities/script';
import { createRecordMock, createRecordHandlers } from 'src/entities/record';

const fakeDB = new FakeDBStore();
let handlers: HttpHandler[] = [];

if (import.meta.env.VITE_FAKEAPI_AGENT == 1) {
    const count = +import.meta.env.VITE_FAKEAPI_AGENT_COUNT;
    fakeDB.endpoints.agent = faker.helpers.multiple(createAgentMock, { count });
    handlers = [...handlers, ...createAgentHandlers(fakeDB)];
}

if (import.meta.env.VITE_FAKEAPI_DICT == 1) {
    const count = +import.meta.env.VITE_FAKEAPI_DICT_COUNT;
    fakeDB.endpoints.dict = faker.helpers.multiple(createDictMock, { count });
    while (!fakeDB.endpoints.dict.find((dict) => dict.attributes.type === 'marker')) {
        fakeDB.endpoints.dict = faker.helpers.multiple(createDictMock, { count: 1 });
    }
    handlers = [...handlers, ...createDictHandlers(fakeDB)];
}

if (import.meta.env.VITE_FAKEAPI_SCRIPT == 1) {
    const count = +import.meta.env.VITE_FAKEAPI_SCRIPT_COUNT;
    fakeDB.endpoints.script = faker.helpers.multiple(() => createScriptMock(fakeDB.endpoints.dict), { count });
    handlers = [...handlers, ...createScriptHandlers(fakeDB)];
}

if (import.meta.env.VITE_FAKEAPI_RECORD == 1) {
    const count = +import.meta.env.VITE_FAKEAPI_RECORD_COUNT;
    fakeDB.endpoints.record = faker.helpers.multiple(
        () => createRecordMock(fakeDB.endpoints.agent, fakeDB.endpoints.script),
        { count }
    );
    handlers = [...handlers, ...createRecordHandlers(fakeDB)];
}

export const worker = setupWorker(...handlers);
