import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

//types
import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';
import type { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
import type { TAgent } from '../types/types.ts';

class AgentListStore {
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

        const initAgentList = autorun(async () => this.getList());
        initAgentList();
    }

    getList(getParams?: TAPIGetParams) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        this.rootStore.api.agent
            .list(getParams)
            .then((res) =>
                runInAction(() => {
                    this.data = res.data;
                    this.meta = res.meta!;
                    this.state = 'done';
                })
            )
            .catch(() => runInAction(() => this.errorStore()));
    }

    del(agentID: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        this.rootStore.api.agent
            .del(agentID)
            .then(() => runInAction(() => (this.state = 'done')))
            .catch(() => runInAction(() => this.errorStore()));
    }

    private errorStore() {
        this.data = [];
        this.meta = null;
        this.state = 'error';
    }
}

export default AgentListStore;
