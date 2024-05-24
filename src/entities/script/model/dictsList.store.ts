import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

//types
import { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import type RootStore from 'src/app/model/root.store.ts';
import type { TStoreState } from 'src/shared/types/types.ts';
import { TDict } from '../types/types.ts';

class DictsListStore {
    rootStore: RootStore;

    data: TDict[] = [];
    meta: TAPIResponseMeta | null = null;

    state: TStoreState = 'init';

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            data: observable,
            meta: observable,
            state: observable,
            get: action,
            del: action
        });

        this.rootStore = rootStore;

        autorun(async () => this.get());
    }

    async get(getParams?: TAPIGetParams) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.dict.list(getParams);

        runInAction(() => {
            this.data = res.data;
            this.meta = res.meta!;
            this.state = 'done';
        });
    }

    async del(dictID: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.dict.del(dictID);

        runInAction(() => {
            this.state = 'done';
        });
    }
}

export default DictsListStore;
