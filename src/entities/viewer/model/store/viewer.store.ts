import { makeObservable, observable } from 'mobx';

import authStore from '../../../../shared/auth';

class ViewerStore {
    auth: boolean;
    state: 'init' | 'done' | 'pending' | 'error' = 'init';

    constructor() {
        makeObservable(this, {
            auth: observable,
            state: observable
        });

        this.auth = authStore.auth;
        // this.auth = true;

        this.state = 'done';
    }
}

export default ViewerStore;
