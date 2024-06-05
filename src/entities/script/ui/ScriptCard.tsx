import { ChangeEvent, FC } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';

import type RootStore from 'src/app/model/root.store.ts';
import type { ScriptCardStore, TDict } from 'src/entities/script';
import { DictPriority } from 'src/entities/script';

import AppFlippedInput from 'src/shared/ui/AppFlippedInput';

import {
    AppMoveListSourceList,
    AppMoveListSourceItem,
    AppMoveListDivider,
    AppMoveListSelectedItem,
    AppMoveListSelectedList
} from 'src/shared/ui/AppMoveList';

interface IProps {
    scriptStore: ScriptCardStore;
    rootStore: RootStore;
    activeTabs: string;
    setActiveTabs: (activeTabs: string) => void;
}

const ScriptCard: FC<IProps> = observer(({ scriptStore, rootStore, activeTabs, setActiveTabs }) => {
    if (!scriptStore.data) return;

    const markerIDs = scriptStore.data.attributes.marker.reduce<string[]>((result, dict) => [...result, dict.id], []);
    const kevIDs = scriptStore.data.attributes.kev.reduce<string[]>((result, dict) => [...result, dict.id], []);
    const objectionIDs = scriptStore.data.attributes.objection.reduce<string[]>(
        (result, dict) => [...result, dict.id],
        []
    );

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: 'name' | 'comment'
    ) => {
        scriptStore.updTextField(fieldName, e.target.value);
    };

    const handleAddMarker = (dictID: string) => {
        const oldValue = [...scriptStore.data!.attributes.marker];
        scriptStore.updMarkerIDs([...oldValue, { id: dictID, priority: DictPriority.normal }]);
    };

    const handleDelMarker = (dictID: string) => {
        const oldValue = [...scriptStore.data!.attributes.marker];
        scriptStore.updMarkerIDs(oldValue.filter((marker) => marker.id !== dictID));
    };

    const handleAddKev = (dictID: string) => {
        const oldValue = [...scriptStore.data!.attributes.kev];
        scriptStore.updKevIDs([...oldValue, { id: dictID }]);
    };

    const handleDelKev = (dictID: string) => {
        const oldValue = [...scriptStore.data!.attributes.kev];
        scriptStore.updKevIDs(oldValue.filter((kev) => kev.id !== dictID));
    };

    const handleAddObjection = (dictID: string) => {
        const oldValue = [...scriptStore.data!.attributes.objection];
        scriptStore.updObjectionIDs([...oldValue, { id: dictID, priority: DictPriority.normal }]);
    };

    const handleDelObjection = (dictID: string) => {
        const oldValue = [...scriptStore.data!.attributes.objection];
        scriptStore.updObjectionIDs(oldValue.filter((objection) => objection.id !== dictID));
    };

    return (
        <div className={'flex flex-col gap-4'}>
            <AppFlippedInput
                value={scriptStore.data.attributes.name}
                setValue={(e) => handleInputChange(e, 'name')}
                placeholder={'Введите название ...'}
                required={true}
                style={{
                    container: { height: 'h-9' },
                    text: 'fw-600 text-xl c-color-main',
                    input: 'w-full py-1 fw-600 text-xl c-color-main b-none outline-none bg-transparent placeholder:c-red',
                    placeholder: 'fw-500 text-xl c-red/75 group-hover:c-red transition-100'
                }}
            />
            <Tabs.Root value={activeTabs} onValueChange={setActiveTabs} orientation="vertical">
                <Tabs.List className={'mb-2 flex items-center gap-2'}>
                    <Tabs.Trigger
                        className={classNames('tabs__title', { tabs__title_active: activeTabs === 'marker' })}
                        value="marker">
                        <div className={'i-ri:chat-new-line text-4 c-color-second'} />
                        <p className={'fw-500 c-color-main text-sm'}>Маркеры</p>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        className={classNames('tabs__title', { tabs__title_active: activeTabs === 'kev' })}
                        value="kev">
                        <div className={'i-ri:chat-check-line text-4 c-color-second'} />
                        <p className={'fw-500 c-color-main text-sm'}>КЭВ</p>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        className={classNames('tabs__title', { tabs__title_active: activeTabs === 'objection' })}
                        value="objection">
                        <div className={'i-ri:chat-delete-line text-4 c-color-second'} />
                        <p className={'fw-500 c-color-main text-sm'}>Возражения</p>
                    </Tabs.Trigger>
                </Tabs.List>

                {/************************************************************/}
                {/*marker*/}
                <Tabs.Content value="marker">
                    <div className={'tabs__content_active'}>
                        <AppMoveListSourceList title={'Доступно:'}>
                            {rootStore.dictsList.data
                                .filter((dict) => dict.attributes.type === 'marker' && !markerIDs.includes(dict.id!))
                                .map((marker, index) => (
                                    <AppMoveListSourceItem
                                        key={index}
                                        name={
                                            rootStore.dictsList.data.find((dict) => dict.id === marker.id)!.attributes
                                                .name
                                        }
                                        onClick={() => handleAddMarker(marker.id!)}
                                    />
                                ))}
                        </AppMoveListSourceList>
                        <AppMoveListDivider />
                        <AppMoveListSelectedList title={'Выбрано:'}>
                            {scriptStore.data.attributes.marker.map((marker, index) => (
                                <AppMoveListSelectedItem
                                    key={index}
                                    name={
                                        rootStore.dictsList.data.find((dict) => dict.id === marker.id)!.attributes.name
                                    }
                                    important={marker.priority}
                                    setImportant={(newPriority) =>
                                        scriptStore.updDictPriority('marker', marker.id, newPriority)
                                    }
                                    onClick={() => handleDelMarker(marker.id)}
                                />
                            ))}
                        </AppMoveListSelectedList>
                    </div>
                </Tabs.Content>

                {/************************************************************/}
                {/*kev*/}
                <Tabs.Content value="kev">
                    <div className={'tabs__content_active'}>
                        <AppMoveListSourceList title={'Доступно:'}>
                            {rootStore.dictsList.data
                                .filter((dict) => dict.attributes.type === 'kev' && !kevIDs.includes(dict.id!))
                                .map((marker, index) => (
                                    <AppMoveListSourceItem
                                        key={index}
                                        name={
                                            rootStore.dictsList.data.find((dict) => dict.id === marker.id)!.attributes
                                                .name
                                        }
                                        onClick={() => handleAddKev(marker.id!)}
                                    />
                                ))}
                        </AppMoveListSourceList>
                        <AppMoveListDivider />
                        <AppMoveListSelectedList title={'Выбрано:'}>
                            {scriptStore.data.attributes.kev.map((kev, index) => (
                                <AppMoveListSelectedItem
                                    key={index}
                                    name={rootStore.dictsList.data.find((dict) => dict.id === kev.id)!.attributes.name}
                                    onClick={() => handleDelKev(kev.id)}
                                />
                            ))}
                        </AppMoveListSelectedList>
                    </div>
                </Tabs.Content>

                {/************************************************************/}
                {/*objection*/}
                <Tabs.Content value="objection">
                    <div className={'h-180 px-4 grid grid-cols-[1fr_auto_1fr] gap-2'}>
                        <AppMoveListSourceList title={'Доступно:'}>
                            {rootStore.dictsList.data
                                .filter(
                                    (dict) => dict.attributes.type === 'objection' && !objectionIDs.includes(dict.id!)
                                )
                                .map((marker, index) => (
                                    <AppMoveListSourceItem
                                        key={index}
                                        name={
                                            rootStore.dictsList.data.find((dict) => dict.id === marker.id)!.attributes
                                                .name
                                        }
                                        onClick={() => handleAddObjection(marker.id!)}
                                    />
                                ))}
                        </AppMoveListSourceList>
                        <AppMoveListDivider />
                        <AppMoveListSelectedList title={'Выбрано:'}>
                            {scriptStore.data.attributes.objection.map((objection, index) => (
                                <AppMoveListSelectedItem
                                    key={index}
                                    name={
                                        rootStore.dictsList.data.find((dict) => dict.id === objection.id)!.attributes
                                            .name
                                    }
                                    important={objection.priority}
                                    setImportant={(newPriority) =>
                                        scriptStore.updDictPriority('marker', objection.id, newPriority)
                                    }
                                    onClick={() => handleDelObjection(objection.id)}
                                />
                            ))}
                        </AppMoveListSelectedList>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
});

export default ScriptCard;
