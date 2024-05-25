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
        if (this.state === 'pending') return;
        this.state = 'pending';

        this.rootStore.api.agent
            .list(getParams)
            .then(
                action((res) => {
                    this.data = res.data;
                    this.meta = res.meta!;
                    this.state = 'done';
                })
            )
            .catch(action(() => this.resetStore));
    }

    async del(agentID: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        this.rootStore.api.agent
            .del(agentID)
            .then(action(() => (this.state = 'done')))
            .catch(this.resetStore);
    }

    private resetStore() {
        this.data = [];
        this.meta = null;
        this.state = 'error';
    }
}

export default AgentListStore;
