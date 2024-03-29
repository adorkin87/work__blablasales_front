import { action, makeObservable, observable } from 'mobx';

import type RootStore from 'src/app/model/root.store.ts';
import { toast } from 'react-toastify';
import type { TStoreState } from 'src/shared/types/types.ts';

class AuthStore {
    rootStore: RootStore;

    value: boolean;

    state: TStoreState = 'init';

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            value: observable,
            state: observable,

            login: action,
            logout: action
        });

        this.rootStore = rootStore;

        this.value = localStorage.getItem('auth') ? localStorage.getItem('auth') === 'true' : false;
        this.state = 'done';
    }

    login(login: string, password: string) {
        if (login === 'demo_aaadmin' && password === 'pppasword1') {
            localStorage.setItem('auth', 'true');
            this.value = true;
        } else toast.error('Не верное имя пользователя или парль');
    }

    logout() {
        localStorage.removeItem('auth');
        this.value = false;
    }
}

export default AuthStore;
