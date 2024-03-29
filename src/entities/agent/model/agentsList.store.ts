import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

//types
import { TAPIGetParams, TAPIResponseMeta } from 'src/shared/api';
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
            get: action
        });

        this.rootStore = rootStore;

        autorun(async () => this.get());
    }

    async get(getParams?: TAPIGetParams) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.agent.all(getParams);

        runInAction(() => {
            this.data = res.data;
            this.meta = res.meta!;
            this.state = 'done';
        });
    }

    // async del(id: string) {
    //     if (this.state === 'pending') return;
    //     this.state = 'pending';
    //
    //     const res = await this.rootStore.api.agents.del(id);
    //
    //     if ('errors' in res) {
    //         runInAction(() => {
    //             /* add error toast */
    //             this.state = 'error';
    //         });
    //         return;
    //     }
    //
    //     this.state = 'done';
    // }
}

export default AgentsListStore;
