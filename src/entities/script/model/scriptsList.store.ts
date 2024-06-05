import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';
import type { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
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

        const initScriptList = autorun(async () => this.getList());
        initScriptList();
    }

    async getList(getParams?: TAPIGetParams) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            const res = await this.rootStore.api.script.list(getParams);
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

    async del(scriptID: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            await this.rootStore.api.script.del(scriptID);
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

export default ScriptsListStore;
