import { ChangeEvent, FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import type { ScriptCardStore, TScript } from 'src/entities/script';

import AppFlippedInput from 'src/shared/ui/AppFlippedInput';
import RootStoreContext from 'src/app/providers/rootStore.context.ts';

interface IProps {
    scriptStore: ScriptCardStore;
}

const ScriptCard: FC<IProps> = observer(({ scriptStore }) => {
    if (!scriptStore.data) return;

    const rootStore = useContext(RootStoreContext)!;

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: keyof TScript['attributes']
    ) => {
        scriptStore.updTextField(fieldName, e.target.value);
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
            <div className={'flex flex-col gap-4'}>
                <div>
                    <p>КЭВ</p>
                    {scriptStore.data.attributes.kev.map((kev, index) => (
                        <p key={index}>{rootStore.dictsList.data.find((dict) => dict.id === kev.id).attributes.name}</p>
                    ))}
                </div>
                <div>
                    <p>Маркеры</p>
                    {scriptStore.data.attributes.marker.map((kev, index) => (
                        <p key={index}>{rootStore.dictsList.data.find((dict) => dict.id === kev.id).attributes.name}</p>
                    ))}
                </div>
                <div>
                    <p>Возражения</p>
                    {scriptStore.data.attributes.kev.map((kev, index) => (
                        <p key={index}>{rootStore.dictsList.data.find((dict) => dict.id === kev.id).attributes.name}</p>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ScriptCard;
