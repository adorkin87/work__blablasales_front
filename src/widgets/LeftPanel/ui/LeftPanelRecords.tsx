import { Link as ReactLink, useLocation } from 'react-router-dom';

//mui
import { Link, Stack } from '@mui/joy';

//components
import AppLeftPanel from 'src/shared/ui/AppLeftPanel';

const LeftPanelRecords = () => {
    const location = useLocation();

    const currentSection =
        location.pathname === '/' ? '/' : location.pathname.substring(1, location.pathname.length).split('/')[1];

    // *************************************************************************************************
    // render

    return (
        <AppLeftPanel>
            <Stack direction={'column'} gap={2}>
                <Link
                    component={ReactLink}
                    to={'/records/upload'}
                    underline={currentSection === 'upload' ? 'always' : 'hover'}
                    sx={{
                        color: currentSection === 'upload' ? '#65e4a3' : '#fff',
                        textDecorationColor: '#65e4a3'
                    }}>
                    + Добавить аудио
                </Link>
                <Link
                    component={ReactLink}
                    to={'/'}
                    underline={currentSection === '/' ? 'always' : 'hover'}
                    sx={{ color: currentSection === '/' ? '#65e4a3' : '#fff', textDecorationColor: '#65e4a3' }}>
                    Список загрузок
                </Link>
            </Stack>
        </AppLeftPanel>
    );
};

export default LeftPanelRecords;
