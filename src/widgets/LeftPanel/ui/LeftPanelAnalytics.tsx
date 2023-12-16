import { Link as ReactLink, useLocation } from 'react-router-dom';

//mui
import { Link, Stack } from '@mui/joy';

//components
import AppLeftPanel from '../../../shared/ui/AppLeftPanel';

const LeftPanelAnalytics = () => {
    const location = useLocation();

    const currentSection: string =
        location.pathname === '/analytics'
            ? 'analytics'
            : location.pathname.substring(1, location.pathname.length).split('/')[1];

    // *************************************************************************************************
    // render

    return (
        <AppLeftPanel>
            <Stack direction={'column'} gap={2}>
                <Link
                    component={ReactLink}
                    to={'/analytics'}
                    underline={currentSection === 'add' ? 'always' : 'hover'}
                    sx={{
                        color: currentSection === 'add' ? '#65e4a3' : '#fff',
                        textDecorationColor: '#65e4a3'
                    }}>
                    Отчет 1
                </Link>
                <Link
                    component={ReactLink}
                    to={'/analytics'}
                    underline={currentSection === 'scripts' ? 'always' : 'hover'}
                    sx={{
                        color: currentSection === 'scripts' ? '#65e4a3' : '#fff',
                        textDecorationColor: '#65e4a3'
                    }}>
                    Отчет 2
                </Link>
            </Stack>
        </AppLeftPanel>
    );
};

export default LeftPanelAnalytics;
