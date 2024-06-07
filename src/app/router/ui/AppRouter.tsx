import { Suspense, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import LeftPanel from 'src/widgets/LeftPanel';
import authorizedRoutes from 'src/app/router/routes/authorized.routes.tsx';
import nonAuthorizedRoutes from 'src/app/router/routes/nonAuthorized.routes.tsx';

//stores
import rootStoreContext from 'src/app/providers/rootStore.context.ts';

const AppRouter = observer(() => {
    const rootStore = useContext(rootStoreContext);

    const location = useLocation();
    const navigate = useNavigate();

    const element = useRoutes(rootStore?.viewer.auth.value ? authorizedRoutes : nonAuthorizedRoutes);

    useEffect(() => {
        !rootStore?.viewer.auth.value && navigate('/login');
    }, [rootStore?.viewer.auth.value]);

    useEffect(() => {
        location.pathname === '/login' && rootStore?.viewer.auth.value && navigate('/');
    }, [location.pathname]);

    // *************************************************************************************************
    // render

    if (!rootStore?.viewer.auth.value) return element;

    return (
        <div className={'flex'}>
            <LeftPanel />
            <div className={'h-dvh w-full p4'}>
                <Suspense>{element}</Suspense>
            </div>
        </div>
    );
});

export default AppRouter;
