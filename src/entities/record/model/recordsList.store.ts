import { makeObservable, observable, runInAction, action } from 'mobx';

import type RootStore from 'src/app/model/root.store.ts';
import type { TAPIGetParams, TAPIResponseMeta, TStoreState } from 'src/shared/types/types.ts';
import type { TRecord } from '../types/types.ts';
import type { TAgent } from 'src/entities/agent';
import type { TScript } from 'src/entities/script';

class RecordsListStore {
    rootStore: RootStore;

    data: TRecord[] = [];
    included: (TAgent | TScript)[] = [];
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
        this.state = 'done';
    }

    async getList(getParams?: TAPIGetParams) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.record.list(getParams);
        console.log(res);

        runInAction(() => {
            this.data = res.data;
            this.included = res.included as Required<(TAgent | TScript)[]>;
            this.meta = res.meta!;
            this.state = 'done';
        });
    }

    async del(recordID: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.record.del(recordID);

        runInAction(() => {
            this.state = 'done';
        });
    }
}

export default RecordsListStore;
