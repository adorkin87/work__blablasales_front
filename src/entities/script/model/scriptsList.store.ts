import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

import type { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import type RootStore from 'src/app/model/root.store.ts';
import type { TStoreState } from 'src/shared/types/types.ts';
import type { TDict, TScript } from '../types/types.ts';

class ScriptsListStore {
    rootStore: RootStore;

    data: TScript[] = [];
    included: TDict[] = [];
    meta: TAPIResponseMeta | null = null;

    state: TStoreState = 'init';

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            data: observable,
            meta: observable,
            state: observable,
            getList: action,
            del: action
        });

        this.rootStore = rootStore;

        autorun(async () => this.getList());
    }

    async getList(getParams?: TAPIGetParams) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.script.list(getParams);

        runInAction(() => {
            this.data = res.data;
            this.included = res.included as Required<TDict[]>;
            this.meta = res.meta!;
            this.state = 'done';
        });
    }

    async del(scriptID: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.script.del(scriptID);

        runInAction(() => {
            this.state = 'done';
        });
    }
}

export default ScriptsListStore;
