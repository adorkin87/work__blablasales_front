import { ChangeEvent, FC } from 'react';
import { observer } from 'mobx-react-lite';

import type { TDict } from '../types/types.ts';
import type DictCardStore from '../model/dictCard.store.ts';
import type { SingleValue } from 'react-select';

import AppFlippedInput from 'src/shared/ui/AppFlippedInput';
import AppFlippedSelect from 'src/shared/ui/AppFlippedSelect';

const selectOptions = [
    { value: 1, label: 'КЭВ' },
    { value: 2, label: 'Маркер' },
    { value: 3, label: 'Возражение' }
];

enum TypeDictToNumber {
    'kev' = 1,
    'marker' = 2,
    'objection' = 3
}

enum TypeDictToReadable {
    'kev' = 'КЭВ',
    'marker' = 'Маркер',
    'objection' = 'Возражение'
}

interface IDictCard {
    dictStore: DictCardStore;
    onShow: boolean;
}

const DictCard: FC<IDictCard> = observer(({ dictStore, onShow }) => {
    if (!dictStore.data) return;

    const selectValue: TDict['attributes']['type'] = dictStore.data.attributes.type ?? 'marker';

    //**************************************************************************************************
    //agentHandlers

    const handleInputChange = (
        fieldName: keyof TDict['attributes'],
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dictStore.updTextField(fieldName, e.target.value);
    };

    const handleSelectChange = (newValue: SingleValue<{ value: number; label: string }>) => {
        newValue && dictStore.updTextField('type', TypeDictToNumber[newValue.value]);
    };

    const handleTriggerAdd = () => {
        dictStore.addTrigger();
    };

    const handleTriggerChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        dictStore.updTrigger(e.target.value, index);
    };

    const handleTriggerDel = (index: number) => {
        dictStore.delTrigger(index);
    };

    //**************************************************************************************************
    //render

    return (
        <div className={'flex flex-col gap-4'}>
            <AppFlippedInput
                value={dictStore.data.attributes.name}
                setValue={(e) => handleInputChange('name', e)}
                placeholder={'Введите название ...'}
                required={true}
                style={{
                    container: { height: 'h-9' },
                    text: 'fw-600 text-xl c-color-main',
                    input: 'w-full py-1 fw-600 text-xl c-color-main b-none outline-none bg-transparent placeholder:c-red',
                    placeholder: 'fw-500 text-xl c-red/75 group-hover:c-red transition-100'
                }}
            />

            {/*<div className={'flex flex-col gap-1'}>*/}
            {/*    <div className={'flex items-center gap-1'}>*/}
            {/*        <div className={'i-ri-file-text-line c-color-second'} />*/}
            {/*        <p className={'c-color-main fw-500 text-sm'}>Комментарий:</p>*/}
            {/*    </div>*/}
            {/*    <AppFlippedInput*/}
            {/*        value={dictStore.data?.attributes.comment ?? ''}*/}
            {/*        setValue={(e) => handleInputChange('comment', e)}*/}
            {/*        placeholder={'добавить комментарий ...'}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className={'flex flex-col gap-1'}>
                <div className={'flex items-center gap-1'}>
                    <div className={'i-ri:scroll-to-bottom-line c-color-second'} />
                    <p className={'c-color-main fw-500 text-sm'}>Тип:</p>
                </div>
                <AppFlippedSelect
                    options={selectOptions}
                    value={{
                        value: TypeDictToNumber[selectValue],
                        label: TypeDictToReadable[selectValue]
                    }}
                    setNewValue={handleSelectChange}
                    forceClear={onShow}
                />
            </div>

            <div className={'flex flex-col gap-1'}>
                <div className={'flex items-center'}>
                    <div className={'flex items-center gap-1'}>
                        <div className={'i-ri:seo-line c-color-second'} />
                        <p className={'c-color-main fw-500 text-sm'}>Триггеры:</p>
                    </div>
                    <div className={'grow flex justify-end group'}>
                        <div
                            className={
                                'i-ri-add-large-fill c-color-second cursor-pointer opacity-0 group-hover:opacity-100 hover:c-color-main transition-100'
                            }
                            onClick={handleTriggerAdd}
                        />
                    </div>
                </div>
                <div>
                    {dictStore.data?.attributes.triggers.map((trigger, index) => (
                        <div key={index} className={'w-full flex items-center'}>
                            <AppFlippedInput
                                value={trigger}
                                setValue={(e) => handleTriggerChange(e, index)}
                                placeholder={'новый триггер'}
                                leftIcon={<div className={'i-ri:arrow-right-double-line c-color-second'} />}
                                del={{
                                    icon: <div className={'i-ri:delete-bin-fill'} />,
                                    onClick: () => handleTriggerDel(index)
                                }}
                                actionPosition={'right'}
                            />
                        </div>
                    ))}
                </div>
                <div className={'h-7 flex items-center gap-1 cursor-pointer group'} onClick={handleTriggerAdd}>
                    <div className={'i-ri-add-large-fill c-color-second group-hover:c-color-main transition-100'} />
                    <p className={'text-xs c-color-second group-hover:c-color-main transition-100'}>добавить</p>
                </div>
            </div>
        </div>
    );
});

export default DictCard;
