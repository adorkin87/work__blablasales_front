import { action, autorun, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

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

    async getList(getParams?: TAPIGetParams) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            const res = await this.rootStore.api.agent.list(getParams);
            runInAction(() => {
                this.data = res.data;
                this.meta = res.meta!;
                this.state = 'done';
            });
        } catch {
            this.setErrorStore();
        }
    }

    async del(agentID: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            await this.rootStore.api.agent.del(agentID);
            runInAction(() => {
                toast.success('Менеджер удален');
                this.state = 'done';
            });
        } catch {
            toast.error('Произошла ошибка при удалении');
            this.setErrorStore();
        }
    }

    private setErrorStore() {
        this.data = [];
        this.meta = null;
        this.state = 'error';
    }
}

export default AgentListStore;
