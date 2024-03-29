import type { AxiosInstance } from 'axios';

import AgentsListStore from './model/agentsList.store.ts';
import AgentCardStore from './model/agentCard.store.ts';
export { AgentsListStore, AgentCardStore };

import AgentsList from './ui/AgentsList.tsx';
import AgentCard from './ui/AgentCard.tsx';
export { AgentsList, AgentCard };

import createApi from './api/api.ts';
import createFakeApi from './api/fakeApi.ts';

const createAgentApi = (httpPlugin: AxiosInstance) => {
    if (import.meta.env.DEV && Boolean(+import.meta.env.VITE_FAKEAPI_AGENT)) return createFakeApi();
    return createApi(httpPlugin);
};

export { createAgentApi };

export type { TAgent } from './types/types.ts';
