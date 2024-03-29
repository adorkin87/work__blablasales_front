import { makeObservable, observable, runInAction } from 'mobx';

import type { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import type RootStore from 'src/app/model/root.store.ts';
import { TStoreState } from 'src/shared/types/types.ts';
import type { TScript } from '../types/types.ts';

class ScriptsListStore {
    rootStore: RootStore;

    data: TScript[] = [];
    meta?: TAPIResponseMeta = null;

    state: TStoreState = 'init';

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            data: observable,
            meta: observable,
            state: observable
        });

        this.rootStore = rootStore;
    }

    async get(getParams?: TAPIGetParams) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.script.all(getParams);

        runInAction(() => {
            this.data = res.data;
            this.meta = res.meta!;
            this.state = 'done';
        });
    }
}

export default ScriptsListStore;
