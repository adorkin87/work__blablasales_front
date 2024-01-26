import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

//pages
import Login from 'src/pages/Login';
import { RecordsListPage, RecordsUploadPage } from 'src/pages/Records';
import { ScriptsListPage, ScriptPage } from 'src/pages/Scripts';
import Analytics from 'src/pages/Analytics';
import { ProfileRequisites, ProfileManagers, ProfileManager } from 'src/pages/Profile';
import NotFound from 'src/pages/NotFound';

import Dnd from 'src/pages/Dnd/Dnd.tsx';

//components
import TopPanel from 'src/widgets/TopPanel';

//stores
import authStore from 'src/shared/auth';

const AppRouter = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        authStore.auth ? navigate('/') : navigate('/login');
    }, [authStore.auth]);

    useEffect(() => {
        location.pathname === '/login' && authStore.auth && navigate('/');
    }, [location.pathname]);

    // *************************************************************************************************
    // render

    switch (authStore.auth) {
        case true:
            return (
                <>
                    <TopPanel />
                    <Suspense fallback={<p>Loading...</p>}>
                        <Routes>
                            <Route path={'/'} element={<RecordsListPage />} />
                            <Route path={'/dnd'} element={<Dnd />} />
                            <Route path={'/records/upload'} element={<RecordsUploadPage />} />
                            <Route path={'/scripts'} element={<ScriptsListPage />} />
                            <Route path={'/scripts/add'} element={<ScriptPage />} />
                            <Route path={'/scripts/:slug'} element={<ScriptPage />} />
                            <Route path={'/analytics'} element={<Analytics />} />
                            <Route path={'/profile'} element={<ProfileRequisites />} />
                            <Route path={'/profile/managers'} element={<ProfileManagers />} />
                            <Route path={'/profile/managers/add'} element={<ProfileManager />} />
                            <Route path={'/profile/managers/:slug'} element={<ProfileManager />} />
                            <Route path={'/*'} element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </>
            );

        case false:
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path={'/login'} element={<Login />} />
                    </Routes>
                </Suspense>
            );
    }
});

export default AppRouter;
