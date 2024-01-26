import { BrowserRouter } from 'react-router-dom';

import '@fontsource/inter';
import 'src/shared/styles/reset.scss';
import 'src/shared/styles/var.scss';
import 'src/shared/styles/base.scss';
import 'src/shared/styles/fonts.scss';

import { CssVarsProvider } from '@mui/joy/styles';

import AppRouter from './providers/AppRouter/AppRouter';
import AppTheme from './providers/AppTheme/AppTheme.ts';

const App = () => {
    return (
        <CssVarsProvider theme={AppTheme}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </CssVarsProvider>
    );
};

export default App;
