import { makeObservable, observable, flow, autorun } from 'mobx';

//api func
import { apiCheckToken, apiLogin, apiLogout } from '../api/viewer.api';

class ViewerStore {
    auth: boolean;
    state: 'init' | 'done' | 'pending' | 'error' = 'init';

    constructor() {
        makeObservable(this, {
            auth: observable,
            state: observable,
            login: flow,
            logout: flow
        });

        this.auth = !!localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN);

        // проверяем токен на валидность
        const checkToken = autorun(() => {
            if (this.auth) {
                this.checkToken();
            }
        });
        checkToken();

        this.state = 'done';
    }

    *login(login: string, password: string): Generator<Promise<false | object>> {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const fetchResult = yield apiLogin(login, password).then((r) => r);

            if (!fetchResult) {
                this.auth = false;
                this.state = 'error';
                return;
            }

            if (Object.hasOwn(fetchResult, import.meta.env.VITE_LS_ACCESS_TOKEN)) {
                localStorage.setItem(
                    import.meta.env.VITE_LS_ACCESS_TOKEN,
                    fetchResult[import.meta.env.VITE_LS_ACCESS_TOKEN]
                );
                this.auth = true;
                this.state = 'done';
                return;
            }

            if (Object.hasOwn(fetchResult, 'error')) {
                this.auth = false;
                this.state = 'error';
                return;
            }
        }
    }

    *logout(): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            if (!!localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN)) {
                const accessToken = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

                const fetchResult = yield apiLogout(accessToken).then((r) => r);

                if (fetchResult) {
                    localStorage.removeItem(import.meta.env.VITE_LS_ACCESS_TOKEN);
                    this.auth = false;
                }

                this.state = 'done';
            }
        }
    }

    *checkToken(): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const fetchResult = yield apiCheckToken(localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN)).then(
                (r) => r
            );

            if (!fetchResult) {
                this.logout();
                this.auth = false;
                this.state = 'done';
                return;
            }

            if (Object.hasOwn(fetchResult, import.meta.env.VITE_LS_ACCESS_TOKEN)) {
                localStorage.setItem(
                    import.meta.env.VITE_LS_ACCESS_TOKEN,
                    fetchResult[import.meta.env.VITE_LS_ACCESS_TOKEN]
                );
                this.auth = true;
                this.state = 'done';
                return;
            }

            if (Object.hasOwn(fetchResult, 'error')) {
                this.logout();
                this.auth = false;
                this.state = 'error';
                return;
            }
        }
    }
}

export default ViewerStore;
