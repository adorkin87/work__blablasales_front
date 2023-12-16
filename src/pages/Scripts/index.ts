import { lazy } from 'react';
const ScriptList = lazy(() => import('./ScripList/ui/ScriptList'));
const Script = lazy(() => import('./Script/ui/Script'));
export { ScriptList, Script };
