import { makeObservable, observable } from 'mobx';

//api func
// import { apiLogin, apiLogout, apiCheckToken } from '../../../../api/apiAuth';

class ViewerStore {
    auth;
    bill;
    state = 'pending';
    stateRequest = 'done';

    constructor() {
        makeObservable(this, {
            auth: observable,
            bill: observable,
            state: observable
            // login: flow,
            // logout: flow,
            // checkToken: flow
        });

        this.auth = true;
        this.bill = 7777;

        // this.value = !!localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN);

        //проверяем токен на валидность
        // const checkToken = autorun(() => {
        //     if (this.value) {
        //         this.checkToken();
        //     }
        // });
        // checkToken();
    }

    // *login({ login, password }) {
    //     this.statestate = 'pending';
    //
    //     const fetchResult = yield apiLogin({ login, password }).then((r) => r);
    //
    //     if (fetchResult === false) {
    //         this.value = false;
    //         this.state = 'error';
    //     }
    //
    //     if (Object.hasOwn(fetchResult, import.meta.env.VITE_LS_ACCESS_TOKEN)) {
    //         localStorage.setItem(
    //             import.meta.env.VITE_LS_ACCESS_TOKEN,
    //             fetchResult[import.meta.env.VITE_LS_ACCESS_TOKEN]
    //         );
    //         this.value = true;
    //         this.state = 'done';
    //     }
    //
    //     if (Object.hasOwn(fetchResult, 'error')) {
    //         this.value = false;
    //         this.state = 'error';
    //     }
    // }

    // *logout() {
    //     this.state = 'pending';
    //
    //     const fetchResult = yield apiLogout({
    //         accessToken: localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN)
    //     }).then((r) => r);
    //
    //     fetchResult && localStorage.removeItem(import.meta.env.VITE_LS_ACCESS_TOKEN);
    //
    //     this.value = false;
    //     this.state = 'done';
    // }

    // *checkToken(permissionDenied = false) {
    //     if (this.stateRequest === 'done') {
    //         this.state = 'pending';
    //         this.stateRequest = 'pending';
    //
    //         const fetchResult = yield apiCheckToken({
    //             accessToken: localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN)
    //         }).then((r) => r);
    //
    //         if (Object.hasOwn(fetchResult, import.meta.env.VITE_LS_ACCESS_TOKEN)) {
    //             localStorage.setItem(
    //                 import.meta.env.VITE_LS_ACCESS_TOKEN,
    //                 fetchResult[import.meta.env.VITE_LS_ACCESS_TOKEN]
    //             );
    //             this.value = true;
    //             this.state = permissionDenied ? 'permissionDenied' : 'done';
    //             this.permissions = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]))['permissions'];
    //         }
    //
    //         if (Object.hasOwn(fetchResult, 'error')) {
    //             this.logout();
    //             this.value = false;
    //             this.permissions = [];
    //             this.state = 'error';
    //         }
    //         this.stateRequest = 'done';
    //     }
    // }
}

// const storeAuth = new StoreAuth();

export default ViewerStore;
