import { makeObservable, observable, runInAction, action } from 'mobx';

import type RootStore from 'src/app/model/root.store.ts';
import type { TAPIGetParams, TAPIResponseMeta, TStoreState } from 'src/shared/types/types.ts';
import type { TRecord } from '../types/types.ts';

class RecordsListStore {
    rootStore: RootStore;

    data: TRecord[] = [];
    meta: TAPIResponseMeta | null = null;

    state: TStoreState = 'init';

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            data: observable,
            meta: observable,
            state: observable,
            get: action
        });

        this.rootStore = rootStore;
        this.state = 'done';
    }

    async get(getParams?: TAPIGetParams) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.record.all(getParams);

        runInAction(() => {
            this.data = res.data;
            this.meta = res.meta!;
            this.state = 'done';
        });
    }
}

export default RecordsListStore;
