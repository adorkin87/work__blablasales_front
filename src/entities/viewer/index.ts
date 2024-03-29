import RootStore from 'src/app/model/root.store.ts';

import AuthStore from './model/auth.store.ts';
import ConfStore from './model/conf.store.ts';

function createViewerStore(rootStore: RootStore) {
    return {
        auth: new AuthStore(rootStore),
        conf: new ConfStore(rootStore)
    };
}

export default createViewerStore;

export type TViewerStore = ReturnType<typeof createViewerStore>;
