import { makeObservable, observable, action, flow } from 'mobx';

// api
import { apiGetItems, apiAddItem, apiUpdItem } from '../api/baseRequest.api.ts';

// func
import handleFetchResult from '../lib/handleFetchResult.ts';
import mwRequestToApi from '../middleware/requestToApi.mv';

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

        this.value = this.model = model;
        this.endpoint = endpoint;

        this.state = 'done';
    }

    *getItem(getParams?: object): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            if (accessToken) {
                const fetchResult = yield mwRequestToApi(() => apiGetItems(this.endpoint, accessToken, getParams));

                const resultHandler = handleFetchResult({ response: fetchResult, model: this.model });

                this.initValue = this.value = Object.assign(this.value, resultHandler.value);
                this.state = resultHandler.state;
            }
        }
    }

    *addItem(): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            for (const key of Object.keys(this.model)) {
                this.value[key] = Number.isFinite(this.value[key]) ? Number(this.value[key]) : this.value[key];
            }

            const fetchResult = yield mwRequestToApi(() =>
                apiAddItem({
                    endpoint: this.endpoint,
                    accessToken: localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN),
                    itemData: this.value
                })
            );

            const resultHandler = handlerFetchResult({
                model: this.model,
                result: fetchResult
            });

            this.initValue = this.value = resultHandler.value;
            this.state = resultHandler.state;
        }
    }

    *updItem(itemID: string | number): any {
        this.state = 'pending';

        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            for (const key of Object.keys(this.model)) {
                this.value[key] = Number.isFinite(this.value[key]) ? Number(this.value[key]) : this.value[key];
            }

            const fetchResult = yield mwRequestToApi(() =>
                apiUpdItem({
                    endpoint: this.endpoint,
                    accessToken: localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN),
                    itemID,
                    itemData: this.value
                })
            );

            const resultHandler = handlerFetchResult({
                model: this.model,
                result: fetchResult
            });

            this.initValue = this.value = resultHandler.value;
            this.state = resultHandler.state;
        }
    }

    updStoreValue(field, value) {
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
