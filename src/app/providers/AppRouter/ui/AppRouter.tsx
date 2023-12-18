import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

//pages
import Login from '../../../../pages/Login';
import { ConversationList, ConversationUpload } from '../../../../pages/Conversations';
import { ScriptList, Script } from '../../../../pages/Scripts';
import Analytics from '../../../../pages/Analytics';
import { ProfileRequisites, ProfileManagers } from '../../../../pages/Profile';
import NotFound from '../../../../pages/NotFound';

//components
import TopPanel from '../../../../widgets/TopPanel';

//stores
import viewer from '../../../../entities/viewer';

const AppRouter = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        viewer.auth ? navigate('/') : navigate('/login');
    }, [viewer.auth]);

    useEffect(() => {
        location.pathname === '/login' && viewer.auth && navigate('/');
    }, [location.pathname]);

    // *************************************************************************************************
    // render

    switch (viewer.auth) {
        case true:
            return (
                <>
                    <TopPanel />
                    <Suspense fallback={<p>Loading...</p>}>
                        <Routes>
                            <Route path={'/'} element={<ConversationList />} />
                            <Route path={'/conversation/:upload'} element={<ConversationUpload />} />
                            <Route path={'/scripts'} element={<ScriptList />} />
                            <Route path={'/scripts/add'} element={<Script />} />
                            <Route path={'/scripts/:slug'} element={<Script />} />
                            <Route path={'/analytics'} element={<Analytics />} />
                            <Route path={'/profile'} element={<ProfileRequisites />} />
                            <Route path={'/profile/managers'} element={<ProfileManagers />} />
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
