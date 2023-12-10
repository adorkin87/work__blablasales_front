import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

//pages
import Login from '../../../../pages/Login';
import Conversation from '../../../../pages/Conversation';
import Scripts from '../../../../pages/Scripts';
import Analytics from '../../../../pages/Analytics';
import NotFound from '../../../../pages/NotFound';

//components
import TopPanel from '../../../../widgets/TopPanel';

//stores
import viewer from '../../../../entities/viewer';

const AppRouter = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        !viewer.auth && navigate('/login');
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
                            <Route path={'/'} element={<Conversation />} />
                            <Route path={'/scripts'} element={<Scripts />} />
                            <Route path={'/analytics'} element={<Analytics />} />
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
};

export default observer(AppRouter);
