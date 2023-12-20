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
        JoyTable: {
            defaultProps: {
                size: 'sm'
            }
        },
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
                size: 'sm',
                sx: { outline: 'none' }
            }
        },
        JoyTooltip: {
            defaultProps: {
                enterDelay: 750,
                enterNextDelay: 750
            }
        },
        JoyInput: {
            defaultProps: {
                size: 'sm'
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
