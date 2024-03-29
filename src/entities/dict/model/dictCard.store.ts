import { action, makeObservable, observable, runInAction } from 'mobx';

//types
import type RootStore from 'src/app/model/root.store.ts';
import type { TStoreState } from 'src/shared/types/types.ts';
import type { TDict } from '../types/types.ts';

import { cloneDeep, isEqual } from 'lodash';

class AgentCardStore {
    rootStore: RootStore;

    data: TDict | null = null;
    initData: TDict | null = null;
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
            createNewDict: action,
            updTextField: action,
            addTrigger: action,
            updTrigger: action,
            delTrigger: action
        });

        this.rootStore = rootStore;
    }

    async get(id: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        const res = await this.rootStore.api.dict.one(id);

        if ('errors' in res) {
            runInAction(() => {
                this.initData = this.createEmptyDict();
                this.data = this.createEmptyDict();
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

        this.data.attributes.triggers = this.data.attributes.triggers.filter((trigger) => trigger !== '');

        const res = await this.rootStore.api.dict.add(this.data);

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

    async upd(id: string) {
        if (this.state === 'pending' || !this.data) return;
        if (isEqual(this.initData, this.data)) return;
        this.state = 'pending';

        this.data.attributes.triggers = this.data.attributes.triggers.filter((trigger) => trigger !== '');

        const payload: Partial<TDict['attributes']> = {};
        let key: keyof TDict['attributes'];
        for (key in this.data.attributes) {
            if (!isEqual(this.data.attributes[key], this.initData!.attributes[key]))
                payload[key] = this.data.attributes[key];
        }

        const res = await this.rootStore.api.dict.upd(id, { ...this.data, attributes: { ...payload } });

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

    private createEmptyDict(): TDict {
        return {
            type: 'dict',
            attributes: {
                name: 'Новый маркер',
                type: 'marker',
                comment: undefined,
                triggers: []
            }
        };
    }

    createNewDict() {
        this.state = 'pending';

        this.data = this.createEmptyDict();
        this.changed = false;

        this.state = 'done';
    }

    updTextField(fieldName: keyof TDict['attributes'], newValue: string) {
        if (!this.data) return;
        this.data.attributes[fieldName] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    addTrigger() {
        if (!this.data) return;
        // if (this.data.attributes.triggers.find((item) => item === '') !== undefined) return;
        this.data.attributes.triggers.push('');
        this.changed = !isEqual(this.initData, this.data);
    }

    updTrigger(newValue: string, index: number) {
        if (!this.data) return;
        this.data.attributes.triggers[index] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    delTrigger(index: number) {
        if (!this.data) return;
        this.data.attributes.triggers.splice(index, 1);
        this.changed = !isEqual(this.initData, this.data);
    }
}

export default AgentCardStore;
