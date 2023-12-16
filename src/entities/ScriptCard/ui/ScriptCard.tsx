import { useState } from 'react';
import { observer } from 'mobx-react-lite';

// types
import { Marker, ScriptCardType, Stage, Trigger } from '../model/types/scriptCard.type.ts';

// mui
import { IconButton, Input, Stack, Table } from '@mui/joy';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';

// model
import ScriptStore from '../model/store/scriptCard.store.ts';

const ScriptCard = observer(() => {
    const [curScript] = useState(() => new ScriptStore());

    // *************************************************************************************************
    // handlers

    const handleAddStage = (): void => {
        const updScript: ScriptCardType = { ...curScript.script };
        updScript['stages'].push({ name: '', markers: [] });
        curScript.updStoreValue(updScript);
    };

    const handleDelStage = (indexStage: number): void => {
        const updScript: ScriptCardType = { ...curScript.script };
        updScript['stages'].splice(indexStage, 1);
        curScript.updStoreValue(updScript);
    };

    const handleAddMarker = (indexStage: number): void => {
        const updScript: ScriptCardType = { ...curScript.script };
        updScript['stages'][indexStage]['markers'].push({ name: '', triggers: [] });
        curScript.updStoreValue(updScript);
    };

    const handleDelMarker = (indexStage: number, indexMarker: number): void => {
        const updScript: ScriptCardType = { ...curScript.script };
        updScript['stages'][indexStage]['markers'].splice(indexMarker, 1);
        curScript.updStoreValue(updScript);
    };

    const handleAddTrigger = (indexStage: number, indexMarker: number): void => {
        const updScript: ScriptCardType = { ...curScript.script };
        updScript['stages'][indexStage]['markers'][indexMarker]['triggers'].push({ phrase: '' });
        curScript.updStoreValue(updScript);
    };

    const handleDelTrigger = (indexStage: number, indexMarker: number, indexTrigger: number): void => {
        const updScript: ScriptCardType = { ...curScript.script };
        updScript['stages'][indexStage]['markers'][indexMarker]['triggers'].splice(indexTrigger, 1);
        curScript.updStoreValue(updScript);
    };

    // *************************************************************************************************
    // render

    return (
        <Table stickyHeader size={'sm'} borderAxis={'bothBetween'} bgcolor={'white'}>
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
                {curScript['script']['stages'].map((stage: Stage, indexStage: number) => (
                    <tr key={indexStage}>
                        <td>
                            <Stack gap={1}>
                                <Input fullWidth size={'sm'} placeholder={'название этапа'} value={stage.name} />
                                <IconButton size={'sm'} onClick={() => handleDelStage(indexStage)}>
                                    <DeleteForeverRoundedIcon />
                                </IconButton>
                            </Stack>
                        </td>
                        <td colSpan={2}>
                            <Table size={'sm'} borderAxis={'bothBetween'} bgcolor={'white'}>
                                <tbody>
                                    {curScript.script['stages'][indexStage]['markers'].map(
                                        (marker: Marker, indexMarker: number) => (
                                            <tr key={indexMarker}>
                                                <td>
                                                    <Stack gap={1}>
                                                        <Input
                                                            fullWidth
                                                            placeholder={'название маркера'}
                                                            value={marker['name']}
                                                            size={'sm'}
                                                        />
                                                        <Input
                                                            size={'sm'}
                                                            sx={{ width: 60 }}
                                                            placeholder={'п/п'}
                                                            value={marker['order']}
                                                        />
                                                        <Input
                                                            size={'sm'}
                                                            sx={{ width: 60 }}
                                                            placeholder={'вес'}
                                                            value={marker['weight']}
                                                        />
                                                        <IconButton
                                                            size={'sm'}
                                                            onClick={() => handleDelMarker(indexStage, indexMarker)}>
                                                            <DeleteForeverRoundedIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </td>
                                                <td>
                                                    <Table size={'sm'} borderAxis={'bothBetween'} bgcolor={'white'}>
                                                        <tbody>
                                                            {curScript.script['stages'][indexStage]['markers'][
                                                                indexMarker
                                                            ]['triggers'].map(
                                                                (trigger: Trigger, indexTrigger: number) => (
                                                                    <tr key={indexTrigger}>
                                                                        <td>
                                                                            <Stack gap={1}>
                                                                                <Input
                                                                                    fullWidth
                                                                                    size={'sm'}
                                                                                    placeholder={'название триггера'}
                                                                                    value={trigger['phrase']}
                                                                                />
                                                                                <IconButton
                                                                                    size={'sm'}
                                                                                    onClick={() =>
                                                                                        handleDelTrigger(
                                                                                            indexStage,
                                                                                            indexMarker,
                                                                                            indexTrigger
                                                                                        )
                                                                                    }>
                                                                                    <DeleteForeverRoundedIcon />
                                                                                </IconButton>
                                                                            </Stack>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                            <tr>
                                                                <td>
                                                                    <IconButton
                                                                        size={'sm'}
                                                                        onClick={() =>
                                                                            handleAddTrigger(indexStage, indexMarker)
                                                                        }>
                                                                        <PostAddRoundedIcon />
                                                                    </IconButton>
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
                                            <IconButton size={'sm'} onClick={() => handleAddMarker(indexStage)}>
                                                <PostAddRoundedIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <IconButton size={'sm'} onClick={handleAddStage}>
                            <PostAddRoundedIcon />
                        </IconButton>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
});

export default ScriptCard;
