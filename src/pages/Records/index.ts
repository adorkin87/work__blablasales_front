import { lazy } from 'react';
const RecordsListPage = lazy(() => import('./RecordsListPage/ui/RecordsListPage.tsx'));
const RecordsUploadPage = lazy(() => import('./RecordsUploadPage/ui/RecordsUploadPage.tsx'));
export { RecordsListPage, RecordsUploadPage };
