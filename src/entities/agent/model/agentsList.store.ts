import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

//types
import type { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import type RootStore from 'src/app/model/root.store.ts';
import type { TStoreState } from 'src/shared/types/types.ts';
import type { TAgent } from '../types/types.ts';

class AgentsListStore {
    rootStore: RootStore;

    data: TAgent[] = [];
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

        const res = await this.rootStore.api.agent.list(getParams);

        runInAction(() => {
            this.data = res.data;
            this.meta = res.meta!;
            this.state = 'done';
        });
    }

    async del(agentID: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.agent.del(agentID);

        runInAction(() => {
            this.state = 'done';
        });
    }
}

export default AgentsListStore;
