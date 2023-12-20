import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// types
import { Kev, KevMarker, Marker, Stage, Trigger } from '../model/types/scriptCard.type.ts';

// mui
import { IconButton, Input, Stack, Table, Button, Tooltip, Sheet } from '@mui/joy';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';

// store
import StoreItem from '../../../shared/store/baseStoreItem.ts';

interface ScriptCard {
    scriptID: number | false;
}

const ScriptCard = observer(({ scriptID }: ScriptCard) => {
    const navigate = useNavigate();

    // store
    const [scriptCardStore] = useState(
        () =>
            new StoreItem('http://10.10.0.106:8001/api/v1/script', {
                script_name: '',
                script_comment: '',
                script_text: { kev: { markers: [] }, stages: [] }
            })
    );

    useEffect(() => {
        scriptID && scriptCardStore.getItem({ script_id: scriptID });
    }, []);

    useEffect(() => {
        if (!scriptID && Object.hasOwn(scriptCardStore.value, 'script_id')) {
            navigate(`/scripts/${scriptCardStore.value['script_id']}`);
        }
    }, [scriptCardStore.value]);

    // *************************************************************************************************
    // handlers

    const wrapperTableRef = useCallback((node: any): void => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop - 32 + 'px';
        }
    }, []);

    useEffect(() => {
        scriptID && scriptCardStore.getItem({ script_id: scriptID });
    }, []);

    // *************************************************************************************************
    // handlers

    const handleBtnSave = (): void => {
        scriptID ? scriptCardStore.updItem(scriptID) : scriptCardStore.addItem();
    };

    const handleInputChange = (field: string, newValue: string): void => {
        scriptCardStore.updStoreValue(field, newValue);
    };

    // **********************
    // kev

    const handleAddKevMarker = (): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['kev']['markers'].push({ name: '', triggers: [] });
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleDelKevMarker = (indexMarker: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['kev']['markers'].splice(indexMarker, 1);
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleUpdKevMarker = (indexMarker: number, newValue: string): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['kev']['markers'][indexMarker]['name'] = newValue;
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleAddKevTrigger = (indexMarker: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['kev']['markers'][indexMarker]['triggers'].push({ phrase: '' });
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleDelKevTrigger = (indexMarker: number, indexTrigger: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['kev']['markers'][indexMarker]['triggers'].splice(indexTrigger, 1);
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleUpdKevTrigger = (indexMarker: number, indexTrigger: number, newValue: string): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['kev']['markers'][indexMarker]['triggers'][indexTrigger]['phrase'] = newValue;
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    // **********************
    // stages

    const handleAddStage = (): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'].push({ name: '', markers: [] });
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleDelStage = (indexStage: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'].splice(indexStage, 1);
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleUpdStageProps = (indexStage: number, field: 'name' | 'order', newValue: string): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'][indexStage][field] = newValue;
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    // **********************
    // markers

    const handleAddMarker = (indexStage: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'][indexStage]['markers'].push({ name: '', triggers: [] });
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleDelMarker = (indexStage: number, indexMarker: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'][indexStage]['markers'].splice(indexMarker, 1);
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleUpdMarkerProps = (indexStage: number, indexMarker: number, field: string, newValue: string) => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'][indexStage]['markers'][indexMarker][field] = newValue;
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    // **********************
    // triggers

    const handleAddTrigger = (indexStage: number, indexMarker: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'][indexStage]['markers'][indexMarker]['triggers'].push({ phrase: '' });
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleDelTrigger = (indexStage: number, indexMarker: number, indexTrigger: number): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'][indexStage]['markers'][indexMarker]['triggers'].splice(indexTrigger, 1);
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    const handleUpdTriggerProps = (
        indexStage: number,
        indexMarker: number,
        indexTrigger: number,
        newValue: string
    ): void => {
        const updScript: { kev: Kev; stages: Stage[] } = { ...scriptCardStore.value['script_text'] };
        updScript['stages'][indexStage]['markers'][indexMarker]['triggers'][indexTrigger]['phrase'] = newValue;
        scriptCardStore.updStoreValue('script_text', updScript);
    };

    // *************************************************************************************************
    // render

    return (
        <>
            <Stack marginBottom={4} justifyContent={'space-between'}>
                <Stack gap={2}>
                    <Input
                        value={scriptCardStore.value['script_name']}
                        placeholder={'Название скрипта'}
                        onChange={(e) => handleInputChange('script_name', e.target.value)}
                    />
                    <Input
                        value={scriptCardStore.value['script_comment']}
                        placeholder={'Комментарий'}
                        onChange={(e) => handleInputChange('script_comment', e.target.value)}
                    />
                </Stack>
                <Stack gap={2}>
                    <Button onClick={handleBtnSave}>Сохранить</Button>
                    <Button onClick={() => navigate(-1)}>Отмена</Button>
                </Stack>
            </Stack>
            <Sheet ref={wrapperTableRef} sx={{ overflow: 'auto', bgcolor: '#fff' }}>
                <Table stickyHeader borderAxis={'bothBetween'} bgcolor={'white'}>
                    <thead>
                        <tr>
                            <th colSpan={1} style={{ textAlign: 'center' }}>
                                Этап
                            </th>
                            <th colSpan={1} style={{ textAlign: 'center' }}>
                                Маркер
                            </th>
                            <th colSpan={1} style={{ textAlign: 'center' }}>
                                Триггер
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Input value={'Ключевой этап воронки (КЭВ)'} variant={'plain'} color={'success'} />
                            </td>
                            <td colSpan={2}>
                                <Table>
                                    <tbody>
                                        {scriptCardStore.value['script_text']['kev']['markers'].map(
                                            (marker: KevMarker, indexMarker: number) => (
                                                <tr key={indexMarker}>
                                                    <td>
                                                        <Stack gap={1}>
                                                            <Input
                                                                fullWidth
                                                                value={marker['name']}
                                                                placeholder={'Название маркера'}
                                                                onChange={(e) =>
                                                                    handleUpdKevMarker(indexMarker, e.target.value)
                                                                }
                                                                color={'success'}
                                                            />
                                                            <Tooltip title={'Удалить маркер'} placement={'top-end'}>
                                                                <IconButton
                                                                    onClick={() => handleDelKevMarker(indexMarker)}>
                                                                    <DeleteForeverRoundedIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Stack>
                                                    </td>
                                                    <td>
                                                        <Table>
                                                            <tbody>
                                                                {marker['triggers'].map(
                                                                    (trigger: Trigger, indexTrigger: number) => (
                                                                        <tr key={indexTrigger}>
                                                                            <td>
                                                                                <Stack>
                                                                                    <Input
                                                                                        fullWidth
                                                                                        value={trigger['phrase']}
                                                                                        placeholder={
                                                                                            'Название триггера'
                                                                                        }
                                                                                        onChange={(e) =>
                                                                                            handleUpdKevTrigger(
                                                                                                indexMarker,
                                                                                                indexTrigger,
                                                                                                e.target.value
                                                                                            )
                                                                                        }
                                                                                        color={'success'}
                                                                                    />
                                                                                    <Tooltip
                                                                                        title={'Удалить триггер'}
                                                                                        placement={'top-end'}>
                                                                                        <IconButton
                                                                                            onClick={() =>
                                                                                                handleDelKevTrigger(
                                                                                                    indexMarker,
                                                                                                    indexTrigger
                                                                                                )
                                                                                            }>
                                                                                            <DeleteForeverRoundedIcon />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </Stack>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                                <tr>
                                                                    <td>
                                                                        <Tooltip
                                                                            title={'Добавить триггер'}
                                                                            placement={'top-start'}>
                                                                            <IconButton
                                                                                onClick={() =>
                                                                                    handleAddKevTrigger(indexMarker)
                                                                                }>
                                                                                <PostAddRoundedIcon color={'success'} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </td>
                                                </tr>
                                            )
                                        )}

                                        <tr>
                                            <td>
                                                <Tooltip title={'Добавить маркер'} placement={'top-start'}>
                                                    <IconButton onClick={() => handleAddKevMarker()}>
                                                        <PostAddRoundedIcon color={'success'} />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </td>
                        </tr>
                        {scriptCardStore.value['script_text']['stages'].map((stage: Stage, indexStage: number) => (
                            <tr key={indexStage}>
                                <td>
                                    <Stack gap={1}>
                                        <Input
                                            fullWidth
                                            placeholder={'название этапа'}
                                            value={stage['name']}
                                            onChange={(e) => handleUpdStageProps(indexStage, 'name', e.target.value)}
                                        />
                                        <Input
                                            placeholder={'п/п'}
                                            value={stage['order']}
                                            onChange={(e) => handleUpdStageProps(indexStage, 'order', e.target.value)}
                                            sx={{ width: 60 }}
                                        />
                                        <Tooltip title={'Удалить этап'} placement={'top-end'}>
                                            <IconButton onClick={() => handleDelStage(indexStage)}>
                                                <DeleteForeverRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </td>
                                <td colSpan={2}>
                                    <Table borderAxis={'bothBetween'} bgcolor={'white'}>
                                        <tbody>
                                            {scriptCardStore.value['script_text']['stages'][indexStage]['markers'].map(
                                                (marker: Marker, indexMarker: number) => (
                                                    <tr key={indexMarker}>
                                                        <td>
                                                            <Stack gap={1}>
                                                                <Input
                                                                    fullWidth
                                                                    value={marker['name']}
                                                                    placeholder={'название маркера'}
                                                                    onChange={(e) =>
                                                                        handleUpdMarkerProps(
                                                                            indexStage,
                                                                            indexMarker,
                                                                            'name',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                                <Input
                                                                    value={marker['order']}
                                                                    placeholder={'п/п'}
                                                                    onChange={(e) =>
                                                                        handleUpdMarkerProps(
                                                                            indexStage,
                                                                            indexMarker,
                                                                            'order',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    sx={{ width: 60 }}
                                                                />
                                                                <Input
                                                                    value={marker['weight']}
                                                                    placeholder={'вес'}
                                                                    onChange={(e) =>
                                                                        handleUpdMarkerProps(
                                                                            indexStage,
                                                                            indexMarker,
                                                                            'weight',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    sx={{ width: 60 }}
                                                                />
                                                                <Tooltip title={'Удалить маркер'} placement={'top-end'}>
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            handleDelMarker(indexStage, indexMarker)
                                                                        }>
                                                                        <DeleteForeverRoundedIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Stack>
                                                        </td>
                                                        <td>
                                                            <Table borderAxis={'bothBetween'} bgcolor={'white'}>
                                                                <tbody>
                                                                    {scriptCardStore.value['script_text']['stages'][
                                                                        indexStage
                                                                    ]['markers'][indexMarker]['triggers'].map(
                                                                        (trigger: Trigger, indexTrigger: number) => (
                                                                            <tr key={indexTrigger}>
                                                                                <td>
                                                                                    <Stack gap={1}>
                                                                                        <Input
                                                                                            fullWidth
                                                                                            value={trigger['phrase']}
                                                                                            placeholder={
                                                                                                'название триггера'
                                                                                            }
                                                                                            onChange={(e) =>
                                                                                                handleUpdTriggerProps(
                                                                                                    indexStage,
                                                                                                    indexMarker,
                                                                                                    indexTrigger,
                                                                                                    e.target.value
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                        <Tooltip
                                                                                            title={'Удалить триггер'}
                                                                                            placement={'top-end'}>
                                                                                            <IconButton
                                                                                                onClick={() =>
                                                                                                    handleDelTrigger(
                                                                                                        indexStage,
                                                                                                        indexMarker,
                                                                                                        indexTrigger
                                                                                                    )
                                                                                                }>
                                                                                                <DeleteForeverRoundedIcon />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    </Stack>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                    <tr>
                                                                        <td>
                                                                            <Tooltip
                                                                                title={'Добавить триггер'}
                                                                                placement={'top-start'}>
                                                                                <IconButton
                                                                                    onClick={() =>
                                                                                        handleAddTrigger(
                                                                                            indexStage,
                                                                                            indexMarker
                                                                                        )
                                                                                    }>
                                                                                    <PostAddRoundedIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            <tr>
                                                <td>
                                                    <Tooltip title={'Добавить маркер'} placement={'top-start'}>
                                                        <IconButton onClick={() => handleAddMarker(indexStage)}>
                                                            <PostAddRoundedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <Tooltip title={'Добавить этап'} placement={'top-start'}>
                                    <IconButton onClick={handleAddStage}>
                                        <PostAddRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Sheet>
        </>
    );
});

export default ScriptCard;
