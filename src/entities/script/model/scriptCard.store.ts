import { action, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { cloneDeep, isEqual } from 'lodash';

//types
import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';
import type { TScript } from '../types/types.ts';

class ScriptCardStore {
    rootStore: RootStore;

    data: TScript | null = null;
    initData: TScript | null = null;
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
            createNewScript: action,
            updTextField: action,
            updKevIDs: action,
            updMarkerIDs: action,
            updObjectionIDs: action,
            updDictPriority: action
        });

        this.rootStore = rootStore;
    }

    async get(id: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        try {
            const res = await this.rootStore.api.script.one(id);
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
            const res = await this.rootStore.api.script.add(this.data);
            runInAction(() => {
                if (res.errors) {
                    res.errors.map((err) => toast(err.title));
                    this.state = 'done';
                    return;
                }
                this.initData = res.data;
                this.data = cloneDeep(this.initData);
                this.state = 'done';
                toast.success('Скрипт успешно добавлен');
            });
        } catch {
            this.setErrorStore();
        }
    }

    async upd(id: string) {
        if (this.state === 'loading' || !this.data || isEqual(this.initData, this.data)) return;
        this.state = 'loading';

        // const payload: Partial<TScript['attributes']> = {};
        // let key: keyof TScript['attributes'];
        // for (key in this.data.attributes) {
        //     if (!isEqual(this.data.attributes[key], this.initData!.attributes[key]))
        //         payload[key] = this.data.attributes[key];
        // }

        try {
            // const res = await this.rootStore.api.script.upd(id, { ...this.data, attributes: { ...payload } });
            const res = await this.rootStore.api.script.upd(id, this.data);
            runInAction(() => {
                if (res.errors) {
                    res.errors.map((err) => toast(err.title));
                    this.state = 'done';
                    return;
                }
                this.initData = res.data;
                this.data = cloneDeep(this.initData);
                this.state = 'done';
                toast.success('Скрипт успешно обновлен');
            });
        } catch {
            this.setErrorStore();
        }
    }

    private createEmptyScript(): TScript {
        return {
            type: 'script',
            attributes: {
                name: 'Новый скрипт',
                kev: [],
                marker: [],
                objection: []
            }
        };
    }

    createNewScript() {
        this.state = 'pending';

        this.data = this.createEmptyScript();
        this.changed = false;

        this.state = 'done';
    }

    private setErrorStore() {
        this.data = this.createEmptyScript();
        this.initData = this.createEmptyScript();
        this.changed = false;
        this.state = 'error';
    }

    updTextField(fieldName: 'name' | 'comment', newValue: string) {
        if (!this.data) return;
        this.data.attributes[fieldName] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    updKevIDs(newValue: { id: string }[]) {
        if (!this.data) return;
        this.data.attributes.kev = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    updMarkerIDs(newValue: { id: string; priority: number }[]) {
        if (!this.data) return;
        this.data.attributes.marker = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    updObjectionIDs(newValue: { id: string; priority?: number }[]) {
        if (!this.data) return;
        this.data.attributes.objection = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    updDictPriority(type: 'marker' | 'objection', dictID: string, newPriority: number) {
        if (!this.data) return;
        const value = [...this.data.attributes[type]];
        value.forEach((dict) => {
            if (dict.id === dictID) dict.priority = newPriority;
        });
        this.data.attributes[type] = [...value];
        this.changed = !isEqual(this.initData, this.data);
    }
}

export default ScriptCardStore;
