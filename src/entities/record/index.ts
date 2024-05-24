//type
export type { TRecord } from './types/types.ts';

//api
import createRecordApi from './api/api.ts';
export { createRecordApi };

//mocks
import createRecordMock from './mocks/createRecord.mock.ts';
import createRecordHandlers from './mocks/createRecordHandlers.ts';
export { createRecordMock, createRecordHandlers };

//store
import RecordsListStore from './model/recordsList.store.ts';
export { RecordsListStore };
