import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

//types
import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';
import { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import { TDict } from '../types/types.ts';

class DictListStore {
    rootStore: RootStore;

    data: TDict[] = [];
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

        const initDictList = autorun(async () => this.getList());
        initDictList();
    }

    async getList(getParams?: TAPIGetParams) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            const res = await this.rootStore.api.dict.list(getParams);
            runInAction(() => {
                this.data = res.data;
                this.meta = res.meta!;
                this.state = 'done';
            });
        } catch {
            this.setErrorStore();
        }
    }

    async del(dictID: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            await this.rootStore.api.dict.del(dictID);
            runInAction(() => (this.state = 'done'));
        } catch {
            this.setErrorStore();
        }
    }

    private setErrorStore() {
        this.data = [];
        this.meta = null;
        this.state = 'error';
    }
}

export default DictListStore;
