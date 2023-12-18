import { makeObservable, observable, flow } from 'mobx';

// api
import { apiGetItems, apiDelItem } from '../api/baseRequest.api.ts';

// func
import handleFetchResult from '../lib/handleFetchResult.ts';
import mwRequestToApi from '../middleware/requestToApi.mv';

class StoreItemList {
    value: { [key: string]: any };
    model: { [key: string]: any };
    endpoint: string;
    state: StoreState = 'init';

    constructor(endpoint: string, model: object = {}) {
        makeObservable(this, {
            value: observable,
            state: observable,
            getList: flow,
            delItem: flow
        });

        this.value = this.model = model;
        this.endpoint = endpoint;

        this.state = 'done';
    }

    *getList(getParams?: object): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            if (accessToken) {
                const fetchResult = yield mwRequestToApi(() => apiGetItems(this.endpoint, accessToken, getParams));

                const resultHandler = handleFetchResult({ response: fetchResult, model: this.model });

                this.value = Object.assign(this.value, resultHandler.value);
                this.state = resultHandler.state;
            }
        }
    }

    *delItem(itemID: number | string): any {
        if (this.state !== 'pending') {
            this.state = 'pending';

            const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

            if (accessToken) {
                const fetchResult = yield mwRequestToApi(() => apiDelItem(`${this.endpoint}/${itemID}`, accessToken));

                const resultHandler = handleFetchResult({ response: fetchResult, model: this.model });

                Object.hasOwn(this.value, itemID) && delete this.value[itemID];
                this.state = resultHandler.state;
            }
        }
    }
}

export default StoreItemList;
