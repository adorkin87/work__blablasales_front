import { action, flow, makeObservable, observable } from 'mobx';

import { ConversationList } from '../type/conversationList.type.ts';

//api func
// import { apiLogin, apiLogout, apiCheckToken } from '../../../../api/apiAuth';

class ConversationListStore {
    list: ConversationList;
    // endpoint: string = import.meta.env.VITE_ENDPOINT_SCRIPT;
    state: 'init' | 'pending' | 'done' | 'error' = 'init';

    constructor() {
        makeObservable(this, {
            list: observable,
            state: observable,
            getList: flow,
            delItem: flow
            // updStoreValue: action
        });

        this.state = 'done';
    }

    *getScript() {
        this.state = 'pending';
        this.state = 'done';
    }

    *addScript() {
        this.state = 'pending';
        this.state = 'done';
    }

    *updScript() {
        this.state = 'pending';
        this.state = 'done';
    }

    // updStoreValue(updScript: ScriptCardType) {
    //     this.script = updScript;
    // }
}

export default ConversationListStore;
