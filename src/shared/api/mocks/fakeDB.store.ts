class FakeDBStore {
    static #instance: FakeDBStore | null = null;

    endpoints: { [key: string]: any[] } = {};

    constructor() {
        if (FakeDBStore.#instance) {
            return FakeDBStore.#instance;
        }

        FakeDBStore.#instance = this;
    }
}

export default FakeDBStore;
