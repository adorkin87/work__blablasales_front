import { makeObservable, observable, action, flow } from 'mobx';

// api
import { apiGetItems, apiAddItem, apiUpdItem } from '../api/baseRequest.api.ts';

// func
import handleFetchResult from '../lib/handleFetchResult.ts';
import mwRequestToApi from '../middleware/requestToApi.mv';
import { cloneDeep } from 'lodash';

class StoreItem {
    initValue: { [key: string]: any };
    value: { [key: string]: any };
    model: { [key: string]: any };
    endpoint: string;
    state: StoreState = 'init';

    constructor(endpoint: string, model: object = {}) {
        makeObservable(this, {
            value: observable,
            state: observable,
            getItem: flow,
            addItem: flow,
            updItem: flow,
            setEmptyValue: action,
            updStoreValue: action
        });

        this.endpoint = endpoint;
        this.initValue = {};
        this.value = this.model = model;

        this.state = 'done';
    }

    *getItem(getParams?: object): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            if (accessToken) {
                const fetchResult = yield mwRequestToApi(() => apiGetItems(this.endpoint, accessToken, getParams));

                const resultHandler: { value: { [key: string | number]: any }; state: StoreState } = handleFetchResult({
                    response: fetchResult,
                    model: this.model
                });

                this.value = Object.assign(this.value, resultHandler.value[0]);
                this.initValue = cloneDeep(this.value);
                this.state = resultHandler.state;
            }
        }
    }

    *addItem(): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            // for (const key of Object.keys(this.model)) {
            //     this.value[key] = Number.isFinite(this.value[key]) ? Number(this.value[key]) : this.value[key];
            // }

            if (accessToken) {
                const fetchResult = yield mwRequestToApi(() => apiAddItem(this.endpoint, accessToken, this.value));

                const resultHandler: { value: object; state: StoreState } = handleFetchResult({
                    response: fetchResult,
                    model: this.model
                });

                this.value = resultHandler.value;
                this.initValue = cloneDeep(this.value);
                this.state = resultHandler.state;
            }
        }
    }

    *updItem(itemID: string | number): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            console.log('here2');

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            // for (const key of Object.keys(this.model)) {
            //     this.value[key] = Number.isFinite(this.value[key]) ? Number(this.value[key]) : this.value[key];
            // }

            if (accessToken) {
                const fetchResult = yield mwRequestToApi(() =>
                    apiUpdItem(`${this.endpoint}/${itemID}`, accessToken, this.value)
                );

                const resultHandler: { value: object; state: StoreState } = handleFetchResult({
                    response: fetchResult,
                    model: this.model
                });

                this.value = resultHandler.value;
                this.initValue = cloneDeep(this.value);
                this.state = resultHandler.state;
            }
        }
    }

    updStoreValue(field: string, value: any): void {
        if (!Object.hasOwn(this.value, field)) {
            this.initValue[field] = '';
        }
        this.value[field] = value;
    }

    setEmptyValue() {
        this.initValue = this.value = this.model;
        this.state = 'done';
    }
}

export default StoreItem;
