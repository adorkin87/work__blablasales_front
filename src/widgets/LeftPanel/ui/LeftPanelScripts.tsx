import { Link as ReactLink, useLocation } from 'react-router-dom';

//mui
import { Link, Stack } from '@mui/joy';

//components
import AppLeftPanel from '../../../shared/ui/AppLeftPanel';

const LeftPanelScripts = () => {
    const location = useLocation();

    const currentSection: string =
        location.pathname === '/scripts'
            ? 'scripts'
            : location.pathname.substring(1, location.pathname.length).split('/')[1];

    // *************************************************************************************************
    // render

    return (
        <AppLeftPanel>
            <Stack direction={'column'} gap={2}>
                <Link
                    component={ReactLink}
                    to={'/scripts/add'}
                    underline={currentSection === 'add' ? 'always' : 'hover'}
                    sx={{
                        color: currentSection === 'add' ? '#65e4a3' : '#fff',
                        textDecorationColor: '#65e4a3'
                    }}>
                    + Добавить скрипт
                </Link>
                <Link
                    component={ReactLink}
                    to={'/scripts'}
                    underline={currentSection === 'scripts' ? 'always' : 'hover'}
                    sx={{
                        color: currentSection === 'scripts' ? '#65e4a3' : '#fff',
                        textDecorationColor: '#65e4a3'
                    }}>
                    Список скриптов
                </Link>
            </Stack>
        </AppLeftPanel>
    );
};

export default LeftPanelScripts;
