import { action, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';
import { cloneDeep, isEqual } from 'lodash';

//types
import type { TStoreState } from 'src/shared/types/types.ts';
import type RootStore from 'src/app/model/root.store.ts';
import type { TDict } from '../types/types.ts';

class DictCardStore {
    rootStore: RootStore;

    data: TDict | null = null;
    initData: TDict | null = null;
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
            createNewDict: action,
            updTextField: action,
            addTrigger: action,
            updTrigger: action,
            delTrigger: action
        });

        this.rootStore = rootStore;
    }

    get(id: string) {
        if (this.state === 'loading') return;
        this.state = 'loading';

        this.rootStore.api.dict
            .one(id)
            .then(
                action((res) => {
                    this.initData = res.data;
                    this.data = cloneDeep(this.initData);
                    this.state = 'done';
                })
            )
            .catch(this.setErrorStore);
    }

    add() {
        if (this.state === 'loading' || !this.data) return;
        this.state = 'loading';

        this.data.attributes.triggers = this.data.attributes.triggers.filter((trigger) => trigger !== '');

        this.rootStore.api.dict
            .add(this.data)
            .then(
                action((res) => {
                    if (res.errors) {
                        res.errors.map((err) => toast(err.title));
                        this.state = 'done';
                        return;
                    }
                    this.initData = res.data;
                    this.data = cloneDeep(this.initData);
                    this.state = 'done';
                    toast.success('Словарь успешно добавлен');
                })
            )
            .catch(this.setErrorStore);
    }

    upd(id: string) {
        if (this.state === 'loading' || !this.data || isEqual(this.initData, this.data)) return;
        this.state = 'loading';

        this.data.attributes.triggers = this.data.attributes.triggers.filter((trigger) => trigger !== '');

        const payload: Partial<TDict['attributes']> = {};
        let key: keyof TDict['attributes'];
        for (key in this.data.attributes) {
            if (!isEqual(this.data.attributes[key], this.initData!.attributes[key])) {
                // @ts-ignore
                payload[key] = this.data.attributes[key];
            }
        }

        this.rootStore.api.dict
            .upd(id, { ...this.data, attributes: { ...payload } })
            .then(
                action((res) => {
                    if (res.errors) {
                        res.errors.map((err) => toast(err.title));
                        this.state = 'done';
                        return;
                    }
                    this.initData = res.data;
                    this.data = cloneDeep(this.initData);
                    this.state = 'done';
                    toast.success('Словарь успешно обновлен');
                })
            )
            .catch(this.setErrorStore);
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

    private setErrorStore() {
        this.data = this.createEmptyDict();
        this.initData = this.createEmptyDict();
        this.changed = false;
        this.state = 'error';
    }

    updTextField(fieldName: keyof TDict['attributes'], newValue: string) {
        if (!this.data) return;
        // @ts-ignore
        this.data.attributes[fieldName] = newValue;
        this.changed = !isEqual(this.initData, this.data);
    }

    addTrigger() {
        if (!this.data) return;
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

export default DictCardStore;
