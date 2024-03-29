import { action, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { cloneDeep, isEqual } from 'lodash';

//types
import type RootStore from 'src/app/model/root.store.ts';
import type { TStoreState } from 'src/shared/types/types.ts';
import type { TAgent } from '../types/types.ts';

class AgentCardStore {
    rootStore: RootStore;

    data: TAgent | null = null;
    initData: TAgent | null = null;
    changed: boolean = false;

    state: TStoreState = 'init';

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            data: observable,
            state: observable,
            changed: observable,
            get: action,
            add: action,
            upd: action,
            createNewAgent: action,
            updField: action
        });

        this.rootStore = rootStore;
    }

    async get(id: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.agent.one(id);

        if ('errors' in res) {
            runInAction(() => {
                this.initData = this.createEmptyAgent();
                this.data = this.createEmptyAgent();
                /* add error toast */
                this.state = 'error';
            });
            return;
        }

        runInAction(() => {
            this.initData = res.data;
            this.data = cloneDeep(this.initData);
            this.state = 'done';
        });
    }

    async add() {
        if (this.state === 'pending' || !this.data) return;
        this.state = 'pending';

        const res = await this.rootStore.api.agent.add(this.data);

        if ('errors' in res) {
            runInAction(() => {
                /* add error toast */
                this.state = 'error';
            });
            return;
        }

        runInAction(() => {
            this.initData = res.data;
            this.data = cloneDeep(this.initData);
            this.state = 'done';
            toast.success('Менеджер успешно добавлен');
        });
    }

    async upd(id: string) {
        if (this.state === 'pending' || !this.data) return;
        if (isEqual(this.initData, this.data)) return;
        this.state = 'pending';

        const payload: Partial<TAgent['attributes']> = {};
        let key: keyof TAgent['attributes'];
        for (key in this.data.attributes) {
            if (!isEqual(this.data.attributes[key], this.initData!.attributes[key]))
                payload[key] = this.data.attributes[key];
        }

        const res = await this.rootStore.api.agent.upd(id, { ...this.data, attributes: { ...payload } });

        if ('errors' in res) {
            runInAction(() => {
                /* add error toast */
                this.state = 'error';
            });
            return;
        }

        runInAction(() => {
            this.initData = res.data;
            this.data = cloneDeep(this.initData);
            this.state = 'done';
        });
    }

    private createEmptyAgent(): TAgent {
        return {
            type: 'agent',
            attributes: {
                name: 'Менеджер',
                email: undefined,
                phone: undefined,
                comment: undefined
            }
        };
    }

    createNewAgent() {
        this.state = 'pending';

        this.data = this.createEmptyAgent();
        this.changed = false;

        this.state = 'done';
    }

    updField(fieldName: keyof TAgent['attributes'], newValue: string) {
        if (!this.data) return;
        this.data.attributes[fieldName] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }
}

export default AgentCardStore;
