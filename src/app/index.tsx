import { BrowserRouter } from 'react-router-dom';

import '@fontsource/inter';
import '../shared/styles/reset.scss';
import '../shared/styles/base.scss';
import '../shared/styles/var.scss';

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    components: {
        // JoyDivider: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#fff'
        //         }
        //     }
        // },
        JoyStack: {
            defaultProps: {
                direction: 'row'
            }
        },
        JoyLink: {
            defaultProps: {
                fontSize: '20px'
            }
        },
        JoyIconButton: {
            defaultProps: {
                sx: { outline: 'none' }
            }
        }
        // JoyTable: {
        //     defaultProps: {
        //         sx: { borderRadius: 10 }
        //     }
        // }
    }
});

import AppRouter from './providers/AppRouter';

const App = () => {
    return (
        <CssVarsProvider theme={theme}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </CssVarsProvider>
    );
};

export default App;
