import { makeObservable, observable, action, runInAction } from 'mobx';

import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';
import type { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import type { TAgent } from 'src/entities/agent';
import type { TScript } from 'src/entities/script';
import type { TRecord } from '../types/types.ts';

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
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            const res = await this.rootStore.api.record.list(getParams);
            runInAction(() => {
                this.data = res.data;
                this.included = res.included!;
                this.meta = res.meta!;
                this.state = 'done';
            });
        } catch {
            this.setErrorStore();
        }
    }

    async del(recordID: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            await this.rootStore.api.record.del(recordID);
            runInAction(() => (this.state = 'done'));
        } catch {
            this.setErrorStore();
        }
    }

    private setErrorStore() {
        this.data = [];
        this.included = [];
        this.meta = null;
        this.state = 'error';
    }
}

export default RecordsListStore;
