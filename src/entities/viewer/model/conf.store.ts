import { action, makeObservable, observable } from 'mobx';

import RootStore from 'src/app/model/root.store.ts';
import { TStoreState } from 'src/shared/types/types.ts';

class ConfStore {
    rootStore: RootStore;

    cntRowTable: { value: number; label: string };
    state: TStoreState = 'init';

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            cntRowTable: observable,
            changeCntRowTable: action
        });

        this.rootStore = rootStore;

        this.cntRowTable = !!localStorage.getItem('cntRowTable')
            ? JSON.parse(localStorage.getItem('cntRowTable')!)
            : { value: 25, label: '25' };
        this.state = 'done';
    }

    changeCntRowTable(newValue: { value: number; label: string }) {
        this.cntRowTable = newValue;
    }
}

export default ConfStore;
