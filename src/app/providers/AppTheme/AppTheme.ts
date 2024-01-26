import { extendTheme } from '@mui/joy/styles';

const AppTheme = extendTheme({
    components: {
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
        JoyButton: {
            defaultProps: {
                size: 'sm'
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
                enterDelay: 1000,
                enterNextDelay: 1000
            }
        },
        JoyInput: {
            defaultProps: {
                size: 'sm'
            }
        },
        JoySelect: {
            defaultProps: {
                size: 'sm'
            }
        }
    }
});

export default AppTheme;
