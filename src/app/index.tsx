import { BrowserRouter } from 'react-router-dom';

import '@fontsource/inter';
import '../shared/styles/reset.scss';
import '../shared/styles/base.scss';
import '../shared/styles/fonts.scss';
import '../shared/styles/var.scss';

import { CssVarsProvider } from '@mui/joy/styles';

import AppRouter from './providers/AppRouter';

const App = () => {
    return (
        <CssVarsProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </CssVarsProvider>
    );
};

export default App;
