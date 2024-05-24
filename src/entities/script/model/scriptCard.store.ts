import { action, makeObservable, observable, runInAction } from 'mobx';

//types
import type RootStore from 'src/app/model/root.store.ts';
import type { TStoreState } from 'src/shared/types/types.ts';
import type { TScript } from '../types/types.ts';

import { cloneDeep, isEqual } from 'lodash';

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
            updTextField: action
        });

        this.rootStore = rootStore;
    }

    async get(id: string) {
        if (this.state === 'pending') return;
        this.state = 'pending';

        console.log(id);

        const res = await this.rootStore.api.script.one(id);

        if ('errors' in res) {
            runInAction(() => {
                this.initData = this.createEmptyScript();
                this.data = this.createEmptyScript();
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
        // if (this.state === 'pending' || !this.data) return;
        // this.state = 'pending';
        //
        // const res = await this.rootStore.api.dict.add(this.data);
        //
        // if ('errors' in res) {
        //     runInAction(() => {
        //         /* add error toast */
        //         this.state = 'error';
        //     });
        //     return;
        // }
        //
        // runInAction(() => {
        //     this.initData = res.data;
        //     this.data = cloneDeep(this.initData);
        //     this.state = 'done';
        // });
    }

    async upd(id: string) {
        // if (this.state === 'pending' || !this.data) return;
        // if (isEqual(this.initData, this.data)) return;
        // this.state = 'pending';
        //
        // this.data.attributes.triggers = this.data.attributes.triggers.filter((trigger) => trigger !== '');
        //
        // const payload: Partial<TDict['attributes']> = {};
        // let key: keyof TDict['attributes'];
        // for (key in this.data.attributes) {
        //     if (!isEqual(this.data.attributes[key], this.initData!.attributes[key]))
        //         payload[key] = this.data.attributes[key];
        // }
        //
        // const res = await this.rootStore.api.dict.upd(id, { ...this.data, attributes: { ...payload } });
        //
        // if ('errors' in res) {
        //     runInAction(() => {
        //         /* add error toast */
        //         this.state = 'error';
        //     });
        //     return;
        // }
        //
        // runInAction(() => {
        //     this.initData = res.data;
        //     this.data = cloneDeep(this.initData);
        //     this.state = 'done';
        // });
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

    updTextField(fieldName: any, newValue: string) {
        if (!this.data) return;
        this.data.attributes[fieldName] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }
}

export default ScriptCardStore;
