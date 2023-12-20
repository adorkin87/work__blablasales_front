interface HandleFetchResult {
    response: object | false;
    model: object;
}

const handleFetchResult = ({ response, model }: HandleFetchResult): { value: object; state: StoreState } => {
    if (!response) {
        return { value: { model }, state: 'error' };
    }

    if (Object.hasOwn(response, 'error')) {
        return { value: model, state: 'error' };
    }

    return { value: response, state: 'done' };
};

export default handleFetchResult;
