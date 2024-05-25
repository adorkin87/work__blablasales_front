//types
import type { TApiInstance } from '../api/createApi.ts';
import type { TViewerStore } from '../../entities/viewer';

//stores
import createViewerStore from 'src/entities/viewer';
import { AgentCardStore, AgentListStore } from 'src/entities/agent';
import { DictsListStore, ScriptsListStore } from 'src/entities/script';
import { RecordsListStore } from 'src/entities/record';

class RootStore {
    api: TApiInstance;
    viewer: TViewerStore;

    agentsList: AgentListStore;
    agentCard: AgentCardStore;

    recordsList: RecordsListStore;

    scriptsList: ScriptsListStore;
    dictsList: DictsListStore;

    constructor(api: TApiInstance) {
        this.api = api;
        this.viewer = createViewerStore(this);

        this.agentsList = new AgentListStore(this);
        this.agentCard = new AgentCardStore(this);

        this.dictsList = new DictsListStore(this);
        this.scriptsList = new ScriptsListStore(this);

        this.recordsList = new RecordsListStore(this);
    }
}

export default RootStore;
