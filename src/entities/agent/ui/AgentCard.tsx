import { ChangeEvent, FC } from 'react';
import { observer } from 'mobx-react-lite';

import type { TAgent } from '../types/types.ts';
import type AgentCardStore from '../model/agentCard.store.ts';
import AppFlippedInput from 'src/shared/ui/AppFlippedInput';

interface IAgentCard {
    agentStore: AgentCardStore;
}

const AgentCard: FC<IAgentCard> = observer(({ agentStore }) => {
    const handleInputChange = (
        fieldName: keyof TAgent['attributes'],
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        agentStore.updField(fieldName, e.target.value);
    };

    return (
        <div className={'flex flex-col gap-4'}>
            <AppFlippedInput
                value={agentStore.data?.attributes.name}
                setValue={(e) => handleInputChange('name', e)}
                placeholder={'Введите имя ...'}
                required={true}
                style={{
                    container: { height: 'h-9' },
                    text: 'fw-600 text-xl c-color-main',
                    input: 'w-full py-1 fw-600 text-xl c-color-main b-none outline-none bg-transparent placeholder:c-red',
                    placeholder: 'fw-500 text-xl c-red/75 group-hover:c-red transition-100'
                }}
            />
            <div className={'flex flex-col gap-2'}>
                <div className={'flex flex-col gap-1'}>
                    <div className={'flex items-center gap-1'}>
                        <div className={'i-ri-mail-line c-color-second'} />
                        <p className={'c-color-main fw-500 text-sm'}>Email:</p>
                    </div>
                    <AppFlippedInput
                        value={agentStore.data?.attributes.email ?? ''}
                        setValue={(e) => handleInputChange('email', e)}
                        placeholder={'добавить email ...'}
                        type={'email'}
                    />
                </div>
                <div className={'flex flex-col gap-1'}>
                    <div className={'flex items-center gap-1'}>
                        <div className={'i-ri-phone-fill     c-color-second'} />
                        <p className={'c-color-main fw-500 text-sm'}>Телефон:</p>
                    </div>
                    <AppFlippedInput
                        value={agentStore.data?.attributes.phone ?? ''}
                        setValue={(e) => handleInputChange('phone', e)}
                        placeholder={'добавить телефон ...'}
                        type={'phone'}
                    />
                </div>
                <div className={'flex flex-col gap-1'}>
                    <div className={'flex items-center gap-1'}>
                        <div className={'i-ri-file-text-line c-color-second'} />
                        <p className={'c-color-main fw-500 text-sm'}>Комментарий:</p>
                    </div>
                    <AppFlippedInput
                        value={agentStore.data?.attributes.comment ?? ''}
                        setValue={(e) => handleInputChange('comment', e)}
                        placeholder={'добавить комментарий ...'}
                    />
                </div>
            </div>
        </div>
    );
});

export default AgentCard;
