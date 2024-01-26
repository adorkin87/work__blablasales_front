import { lazy } from 'react';
const ScriptsListPage = lazy(() => import('./ScriptsListPage/ui/ScriptsListPage.tsx'));
const ScriptPage = lazy(() => import('./ScriptPage/ui/ScriptPage.tsx'));
export { ScriptsListPage, ScriptPage };
