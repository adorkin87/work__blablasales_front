// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

//styles
import '@fontsource/inter';
import './shared/styles/reset.scss';
import './shared/styles/base.scss';
import { CssVarsProvider } from '@mui/joy/styles';

//components
import AppRouter from './app/AppRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <CssVarsProvider>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </CssVarsProvider>
    // </React.StrictMode>
);
