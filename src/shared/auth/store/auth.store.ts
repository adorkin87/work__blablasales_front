import { makeObservable, observable, flow, autorun } from 'mobx';

//api func
import { apiLogin, apiLogout, apiCheckToken } from '../api/auth.api.ts';

class AuthStore {
    auth: boolean;
    state: StoreState = 'init';

    constructor() {
        makeObservable(this, {
            auth: observable,
            state: observable,
            login: flow,
            logout: flow,
            checkToken: flow
        });

        // this.auth = true;
        this.auth = !!localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN);

        // проверяем токен на валидность
        // const checkToken = autorun((): void => {
        //     if (this.auth) {
        //         this.checkToken();
        //     } else {
        //         this.state = 'done';
        //     }
        // });
        // checkToken();
    }

    *login(login: string, password: string): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const fetchResult = yield apiLogin(login, password).then((r) => r);

            if (!fetchResult) {
                this.auth = false;
                this.state = 'error';
                return;
            }

            if (Object.hasOwn(fetchResult, import.meta.env.VITE_LS_ACCESS_TOKEN)) {
                localStorage.setItem(import.meta.env.VITE_LS_ACCESS_TOKEN, fetchResult['access_token']);
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

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            if (accessToken) {
                const fetchResult = yield apiLogout(accessToken).then((r: boolean) => r);

                if (fetchResult) {
                    localStorage.removeItem(import.meta.env.VITE_LS_ACCESS_TOKEN);
                    this.auth = false;
                }
            } else {
                this.auth = false;
            }

            this.state = 'done';
        }
    }

    *checkToken(): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            if (accessToken) {
                const fetchResult = yield apiCheckToken(accessToken).then((r) => r);

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
                    this.state = 'done';
                    return;
                }

                if (Object.hasOwn(fetchResult, 'error')) {
                    this.logout();
                    this.auth = false;
                    this.state = 'error';
                    return;
                }
            } else {
                this.auth = false;
                this.state = 'error';
            }
        }
    }
}

export default AuthStore;
