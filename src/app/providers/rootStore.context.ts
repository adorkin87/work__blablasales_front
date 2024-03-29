import { createContext } from 'react';

import type RootStore from '../model/root.store.ts';

const RootStoreContext = createContext<RootStore | null>(null);
export default RootStoreContext;
