import { Link as ReactLink, useLocation } from 'react-router-dom';

import { Stack, Link, Typography } from '@mui/joy';

const TopPanel = () => {
    const location = useLocation();

    const currentSection =
        location.pathname === '/' ? '/' : location.pathname.substring(1, location.pathname.length).split('/')[0];

    return (
        <Stack height={80} p={2} justifyContent={'space-between'} alignItems={'center'} bgcolor={'#0a2640'}>
            <Stack gap={8} alignItems={'center'}>
                <Link component={ReactLink} to={'/'} underline={'none'} sx={{ color: '#fff' }}>
                    <Stack alignItems={'center'} gap={1}>
                        <img src={'/images/logo.png'} alt={'logo'} height={40} />
                        <Typography fontSize={40}>BlaBlaSALES</Typography>
                    </Stack>
                </Link>
                <Stack alignItems={'center'} gap={4}>
                    <Link
                        component={ReactLink}
                        to={'/'}
                        underline={currentSection === '/' || currentSection === 'conversation' ? 'always' : 'hover'}
                        sx={{
                            color: currentSection === '/' || currentSection === 'conversation' ? '#65e4a3' : 'white',
                            textDecorationColor: '#65e4a3'
                        }}>
                        Загрузка аудио
                    </Link>
                    <Link
                        component={ReactLink}
                        to={'/scripts'}
                        underline={currentSection === 'scripts' ? 'always' : 'hover'}
                        sx={{
                            color: currentSection === 'scripts' ? '#65e4a3' : 'white',
                            textDecorationColor: '#65e4a3'
                        }}>
                        Редактор скриптов
                    </Link>
                    <Link
                        component={ReactLink}
                        to={'/analytics'}
                        underline={currentSection === 'analytics' ? 'always' : 'hover'}
                        sx={{
                            color: currentSection === 'analytics' ? '#65e4a3' : 'white',
                            textDecorationColor: '#65e4a3'
                        }}>
                        Аналитика
                    </Link>
                </Stack>
            </Stack>
            <Stack alignItems={'center'} gap={4}>
                {/*<p>Баланс {viewer.bill}</p>*/}
                <Link
                    component={ReactLink}
                    underline={currentSection === 'profile' ? 'always' : 'hover'}
                    sx={{ color: currentSection === 'profile' ? '#65e4a3' : 'white', textDecorationColor: '#65e4a3' }}
                    to={'/profile'}>
                    Мой профиль
                </Link>
            </Stack>
        </Stack>
    );
};

export default TopPanel;
