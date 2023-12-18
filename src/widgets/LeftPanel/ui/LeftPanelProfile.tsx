import { Link as ReactLink, useLocation } from 'react-router-dom';

//mui
import { Link, Stack } from '@mui/joy';

//components
import AppLeftPanel from '../../../shared/ui/AppLeftPanel';

const LeftPanelProfile = () => {
    const location = useLocation();

    const currentSection: string =
        location.pathname === '/profile'
            ? 'profile'
            : location.pathname.substring(1, location.pathname.length).split('/')[1];

    // *************************************************************************************************
    // render

    return (
        <AppLeftPanel>
            <Stack direction={'column'} gap={2}>
                <Link
                    component={ReactLink}
                    to={'/profile'}
                    underline={currentSection === 'profile' ? 'always' : 'hover'}
                    sx={{
                        color: currentSection === 'profile' ? '#65e4a3' : '#fff',
                        textDecorationColor: '#65e4a3'
                    }}>
                    Реквизиты
                </Link>
                <Link
                    component={ReactLink}
                    to={'/profile/managers'}
                    underline={currentSection === 'add' ? 'always' : 'hover'}
                    sx={{
                        color: currentSection === 'add' ? '#65e4a3' : '#fff',
                        textDecorationColor: '#65e4a3'
                    }}>
                    Менеджеры
                </Link>
            </Stack>
        </AppLeftPanel>
    );
};

export default LeftPanelProfile;
