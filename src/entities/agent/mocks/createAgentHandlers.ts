import { helperCreateHandlersMockApi } from 'src/shared/api';

const delayResponse =
    import.meta.env.VITE_FAKEAPI_AGENT_DELAY === 'real' ? 'real' : parseInt(import.meta.env.VITE_FAKEAPI_AGENT_DELAY);

const createAgentHandlers = (fakeDB: { endpoints: Record<string, any[]> }) => {
    return helperCreateHandlersMockApi({
        fakeDB,
        apiEndpoint: import.meta.env.VITE_ENDPOINT_AGENT,
        dbEndpoint: 'agent',
        delayResponse
    });
};

export default createAgentHandlers;
