import httpPlugin from './plugins/httpPlugin.ts';
export { httpPlugin };

import helperCreateAPI from './helpers/helperCreateAPI.ts';
import helperCreateFakeAPI from './helpers/helperCreateFakeAPI.ts';
export { helperCreateAPI, helperCreateFakeAPI };

import getFakeItemsList from './mocks/getFakeItemsList.ts';
import getFakeItemCard from './mocks/getFakeItemCard.ts';
import addFakeItemCard from './mocks/addFakeItemCard.ts';
import updFakeItemCard from './mocks/updFakeItemCard.ts';
import delFakeItemCard from './mocks/delFakeItemCard.ts';
import FakeDBStore from './mocks/fakeDB.store.ts';
export { getFakeItemsList, getFakeItemCard, addFakeItemCard, updFakeItemCard, delFakeItemCard, FakeDBStore };

export type { TAPIGetParams, TAPIResponseMeta } from './types/types.ts';
