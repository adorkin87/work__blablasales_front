import { useState } from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';

import { Button, Link, Stack, Grid, Typography, Input } from '@mui/joy';
import HelpIcon from '@mui/icons-material/Help';

import LeftPanel from '../../../widgets/LeftPanel';
import RightPanel from '../../../widgets/RightPanel';

const Scripts = () => {
    const location = useLocation();

    const currentSection =
        location.pathname === '/scripts'
            ? 'scripts'
            : location.pathname.substring(1, location.pathname.length).split('/')[1];

    const [script, setScript] = useState({ name: '', comment: '', stages: [{ name: '' }] });

    const handleAddStage = () => {
        const stages = script['stages'];
        stages.push({ name: '' });
        setScript({ ...script, stages });
    };

    const handleDelStage = (id) => {
        const stages = script['stages'];
    };

    return (
        <Stack direction={'row'}>
            <LeftPanel>
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
            </LeftPanel>
            <RightPanel>
                {/*<Grid container>*/}
                {/*    <Grid xs={4}>*/}
                {/*        <Stack justifyContent={'center'} alignItems={'center'} gap={1}>*/}
                {/*            <Typography>Этапы</Typography>*/}
                {/*            <HelpIcon fontSize={'small'} />*/}
                {/*        </Stack>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <Grid container spacing={4}>
                    <Grid xs={4}>
                        <Typography textAlign={'center'}>Этапы</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography textAlign={'center'}>Маркеры</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography textAlign={'center'}>Триггеры</Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Stack direction={'column'} gap={2}>
                            {script['stages'].map((stage, index) => (
                                <Stack key={index} gap={2}>
                                    <Button>x</Button>
                                    <Input value={stage.name}></Input>
                                    <Input value="2" sx={{ width: 60 }} />
                                </Stack>
                            ))}

                            <Stack justifyContent={'center'} alignItems={'center'}>
                                <Button variant={'outlined'} onClick={handleAddStage}>
                                    +
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </RightPanel>
        </Stack>
    );
};

export default Scripts;
