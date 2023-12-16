import { lazy } from 'react';
const ConversationList = lazy(() => import('./ConversationList/ui/ConversationList'));
const ConversationUpload = lazy(() => import('./ConversationUpload/ui/ConversationUpload'));
export { ConversationList, ConversationUpload };
