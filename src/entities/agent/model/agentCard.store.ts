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

    get(id: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        this.rootStore.api.agent
            .one(id)
            .then((res) =>
                runInAction(() => {
                    this.initData = res.data;
                    this.data = cloneDeep(this.initData);
                    this.state = 'done';
                })
            )
            .catch(() => runInAction(() => this.errorStore()));
    }

    add() {
        if (this.state === 'loading' || !this.data) return;
        this.state = 'loading';

        this.rootStore.api.agent
            .add(this.data)
            .then((res) => {
                if ('errors' in res) {
                    runInAction(() => {
                        res.errors.map((error) => toast(error.title));
                        this.state = 'done';
                    });
                    return;
                }
                runInAction(() => {
                    this.initData = res.data;
                    this.data = cloneDeep(this.initData);
                    this.state = 'done';
                    toast.success('Менеджер успешно добавлен');
                });
            })
            .catch(() => runInAction(() => this.errorStore()));
    }

    upd(id: string) {
        if (this.state === 'loading' || !this.data || isEqual(this.initData, this.data)) return;
        this.state = 'loading';

        const payload: Partial<TAgent['attributes']> = {};
        let key: keyof TAgent['attributes'];
        for (key in this.data.attributes) {
            if (!isEqual(this.data.attributes[key], this.initData!.attributes[key]))
                payload[key] = this.data.attributes[key];
        }

        this.rootStore.api.agent
            .upd(id, { ...this.data, attributes: { ...payload } })
            .then((res) => {
                if ('errors' in res) {
                    runInAction(() => {
                        res.errors.map((error) => toast(error.title));
                        this.state = 'done';
                    });
                    return;
                }
                runInAction(() => {
                    this.initData = res.data;
                    this.data = cloneDeep(this.initData);
                    this.state = 'done';
                    toast.success('Менеджер успешно обновлен');
                });
            })
            .catch(() => runInAction(() => this.errorStore()));
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
        this.state = 'loading';

        this.data = this.createEmptyAgent();
        this.changed = false;

        this.state = 'done';
    }

    updField(fieldName: keyof TAgent['attributes'], newValue: string) {
        if (!this.data) return;
        this.data.attributes[fieldName] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    private errorStore() {
        this.data = this.createEmptyAgent();
        this.initData = this.createEmptyAgent();
        this.changed = false;
        this.state = 'error';
    }
}

export default AgentCardStore;
