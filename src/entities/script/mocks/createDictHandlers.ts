import { helperCreateHandlersMockApi } from 'src/shared/api';

const delayResponse =
    import.meta.env.VITE_FAKEAPI_DICT_DELAY === 'real' ? 'real' : parseInt(import.meta.env.VITE_FAKEAPI_DICT_DELAY);

const createDictHandlers = (fakeDB: { endpoints: Record<string, any[]> }) => {
    return helperCreateHandlersMockApi({
        fakeDB,
        apiEndpoint: import.meta.env.VITE_ENDPOINT_DICT,
        dbEndpoint: 'dict',
        delayResponse
    });
};

export default createDictHandlers;
