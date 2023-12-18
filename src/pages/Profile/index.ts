import { lazy } from 'react';
const ProfileRequisites = lazy(() => import('./ProfileRequisites/ui/ProfileRequisites'));
const ProfileManagers = lazy(() => import('./ProfileManagers/ui/ProfileManagers'));
const ProfileManager = lazy(() => import('./ProfileManager/ui/ProfileManager'));
export { ProfileRequisites, ProfileManagers, ProfileManager };
