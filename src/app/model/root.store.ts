//types
import type { TApiInstance } from '../api/createApi.ts';
import type { TViewerStore } from '../../entities/viewer';

//stores
import createViewerStore from '../../entities/viewer';
import { RecordsListStore } from 'src/entities/record';
import { AgentCardStore, AgentsListStore } from 'src/entities/agent';
import { ScriptsListStore } from 'src/entities/script';
import { DictsListStore } from 'src/entities/dict';

class RootStore {
    api: TApiInstance;
    viewer: TViewerStore;

    agentsList: AgentsListStore;
    agentCard: AgentCardStore;

    recordsList: RecordsListStore;

    scriptsList: ScriptsListStore;
    dictsList: DictsListStore;

    constructor(api: TApiInstance) {
        this.api = api;
        this.viewer = createViewerStore(this);

        this.agentsList = new AgentsListStore(this);
        this.agentCard = new AgentCardStore(this);

        this.recordsList = new RecordsListStore(this);

        this.scriptsList = new ScriptsListStore(this);
        this.dictsList = new DictsListStore(this);
    }
}

export default RootStore;
