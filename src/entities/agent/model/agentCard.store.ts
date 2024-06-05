import { action, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { cloneDeep, isEqual } from 'lodash';

//types
import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';
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
            changed: observable,
            state: observable,
            get: action,
            add: action,
            upd: action,
            createNewAgent: action,
            updField: action
        });

        this.rootStore = rootStore;
    }

    async get(id: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            const res = await this.rootStore.api.agent.one(id);
            runInAction(() => {
                this.initData = res.data;
                this.data = cloneDeep(this.initData);
                this.state = 'done';
            });
        } catch {
            this.setErrorStore();
        }
    }

    async add() {
        if (this.state === 'loading' || !this.data) return;
        this.state = 'loading';

        try {
            const res = await this.rootStore.api.agent.add(this.data);
            runInAction(() => {
                if (res.errors) {
                    res.errors.map((error) => toast(error.title));
                    this.state = 'done';
                    return;
                }
                this.initData = res.data;
                this.data = cloneDeep(this.initData);
                this.state = 'done';
                toast.success('Менеджер успешно добавлен');
            });
        } catch {
            this.setErrorStore();
        }
    }

    async upd(id: string) {
        if (this.state === 'loading' || !this.data || isEqual(this.initData, this.data)) return;
        this.state = 'loading';

        const payload: Partial<TAgent['attributes']> = {};
        let key: keyof TAgent['attributes'];
        for (key in this.data.attributes) {
            if (!isEqual(this.data.attributes[key], this.initData!.attributes[key]))
                payload[key] = this.data.attributes[key];
        }

        try {
            const res = await this.rootStore.api.agent.upd(id, { ...this.data, attributes: { ...payload } });
            runInAction(() => {
                if (res.errors) {
                    res.errors.map((error) => toast(error.title));
                    this.state = 'done';
                    return;
                }
                this.initData = res.data;
                this.data = cloneDeep(this.initData);
                this.state = 'done';
                toast.success('Менеджер успешно обновлен');
            });
        } catch {
            this.setErrorStore();
        }
    }

    private createEmptyAgent(): TAgent {
        return {
            type: 'agent',
            attributes: {
                name: 'Новый менеджер',
                email: undefined,
                phone: undefined,
                comment: undefined
            }
        };
    }

    createNewAgent() {
        this.state = 'loading';

        this.data = this.createEmptyAgent();
        this.changed = false;

        this.state = 'done';
    }

    private setErrorStore() {
        this.data = this.createEmptyAgent();
        this.initData = this.createEmptyAgent();
        this.changed = false;
        this.state = 'error';
    }

    updField(fieldName: keyof TAgent['attributes'], newValue: string) {
        if (!this.data) return;
        this.data.attributes[fieldName] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }
}

export default AgentCardStore;
