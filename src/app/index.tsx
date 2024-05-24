import { BrowserRouter } from 'react-router-dom';

import { Slide, ToastContainer } from 'react-toastify';

import 'virtual:uno.css';
// import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource-variable/inter';

import 'src/shared/styles/reset.scss';
import 'src/shared/styles/var.scss';
import 'src/shared/styles/base.scss';
import 'src/shared/styles/fonts.scss';

import { worker } from './mocks/browser.ts';
export { worker };

import createHttpPlugin from 'src/shared/api/plugins/httpPlugin.ts';
import createApi from './api/createApi.ts';

import RootStore from './model/root.store.ts';
import RootStoreContext from './providers/rootStore.context.ts';

import AppRouter from './router/ui/AppRouter.tsx';

const App = () => {
    const httpPlugin = createHttpPlugin();
    const api = createApi(httpPlugin);
    const rootStore = new RootStore(api);

    return (
        <>
            <RootStoreContext.Provider value={rootStore}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </RootStoreContext.Provider>
            <ToastContainer position={'bottom-right'} transition={Slide} closeOnClick />
        </>
    );
};

export default App;
