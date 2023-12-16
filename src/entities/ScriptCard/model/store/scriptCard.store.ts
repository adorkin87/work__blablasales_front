import { action, flow, makeObservable, observable } from 'mobx';

import { ScriptCardType } from '../types/scriptCard.type.ts';

//api func
// import { apiLogin, apiLogout, apiCheckToken } from '../../../../api/apiAuth';

class ScriptStore {
    script: ScriptCardType;
    // endpoint: string = import.meta.env.VITE_ENDPOINT_SCRIPT;
    state: 'init' | 'pending' | 'done' | 'error' = 'init';

    constructor(script: ScriptCardType = { name: '', comment: '', stages: [] }) {
        makeObservable(this, {
            script: observable,
            state: observable,
            getScript: flow,
            addScript: flow,
            updScript: flow,
            updStoreValue: action
        });

        this.script = script;
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

    updStoreValue(updScript: ScriptCardType) {
        this.script = updScript;
    }
}

export default ScriptStore;
