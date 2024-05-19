import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

import type { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import type RootStore from 'src/app/model/root.store.ts';
import { TStoreState } from 'src/shared/types/types.ts';
import type { TScript } from '../types/types.ts';

class ScriptsListStore {
    rootStore: RootStore;

    data: TScript[] = [];
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

        autorun(async () => this.get());
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
