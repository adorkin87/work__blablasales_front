//type
export type { TDict, TScript } from './types/types.ts';
export { DictPriority } from './types/types.ts';

//api
import createDictApi from './api/dict.api.ts';
import createScriptApi from './api/script.api.ts';
export { createDictApi, createScriptApi };

//mocks
import createDictMock from './mocks/createDict.mock.ts';
import createDictHandlers from './mocks/createDictHandlers.ts';
import { createScriptMock } from './mocks/createScript.mock.ts';
import createScriptHandlers from './mocks/createScriptHandlers.ts';
export { createDictMock, createDictHandlers, createScriptMock, createScriptHandlers };

//store
import DictsListStore from './model/dictsList.store.ts';
import DictCardStore from './model/dictCard.store.ts';
import ScriptsListStore from './model/scriptsList.store.ts';
import ScriptCardStore from './model/scriptCard.store.ts';
export { DictsListStore, DictCardStore, ScriptsListStore, ScriptCardStore };

//ui
import DictsList from './ui/DictsList.tsx';
import DictCard from './ui/DictCard.tsx';
import ScriptsList from './ui/ScriptList.tsx';
import ScriptCard from './ui/ScriptCard.tsx';
export { DictsList, DictCard, ScriptsList, ScriptCard };
