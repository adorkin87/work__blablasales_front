import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

//pages
import Login from '../../../pages/Login';
import Analytics from '../../../pages/MainPage';
import NotFound from '../../../pages/NotFound';

const AppRouter = observer(() => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Routes>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/'} element={<Analytics />} />
                <Route path={'/*'} element={<NotFound />} />
            </Routes>
        </Suspense>
    );
});

export default AppRouter;
