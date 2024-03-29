import { FC, useEffect, useRef, useState } from 'react';
import Select, { ActionMeta, SelectInstance, SingleValue } from 'react-select';

interface IAppFlippedSelect {
    options: { value: number; label: string }[];
    value: { value: number; label: string } | null;
    setNewValue: (
        newValue: SingleValue<{ value: number; label: string }>,
        actionMeta: ActionMeta<{ value: number; label: string }>
    ) => void;
    forceClear?: boolean;
}

const AppFlippedSelect: FC<IAppFlippedSelect> = ({ options, value, setNewValue, forceClear }) => {
    const ref = useRef<SelectInstance<{ value: number; label: string }> | null>(null);

    const [onEdit, setOnEdit] = useState<boolean>(false);

    useEffect(() => {
        onEdit && ref.current && ref.current.focus();
    }, [onEdit]);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.clearValue();
        ref.current?.setValue(value, 'select-option');
    }, [forceClear]);

    const styleIconEdit =
        'i-ri-edit-2-fill flex-shrink-0 c-color-second/75 cursor-pointer opacity-0 transition-100 group-hover:opacity-100 hover:c-color-main';

    if (onEdit)
        return (
            <div className={'h-7 w-full flex items-center gap-1 b-b-1 b-b-style-solid b-b-color-color-second/75'}>
                <div className={'w-full'}>
                    <Select
                        ref={ref}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                minHeight: 28,
                                boxShadow: 'none',
                                border: 'none',
                                background: 'transparent'
                            }),
                            dropdownIndicator: (baseStyles) => ({
                                // display: 'none'
                                ...baseStyles,
                                padding: 2
                            }),
                            indicatorSeparator: () => ({ display: 'none' }),
                            menu: (baseStyles) => ({ ...baseStyles, zIndex: 50 }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: state.isSelected ? 'var(--color-main)' : '',
                                ':hover': {
                                    color: state.isSelected ? '#fff' : '#000',
                                    backgroundColor: state.isSelected
                                        ? 'var(--color-main)'
                                        : 'rgba(var(--color-main_rgb), .25)'
                                }
                            })
                        }}
                        isSearchable={false}
                        defaultValue={value}
                        options={options}
                        onChange={setNewValue}
                        onBlur={() => setOnEdit(false)}
                    />
                </div>
                <div
                    className={
                        'i-ri-check-fill flex-shrink-0 c-color-second/75 cursor-pointer  hover:c-color-main transition-100'
                    }
                    onClick={() => setOnEdit(false)}
                />
            </div>
        );
    else
        return (
            <div className={'h-7 w-full flex items-center gap-1 overflow-hidden group'}>
                <div className={'pl-2 flex items-center gap-1'}>
                    <p className={'text-sm c-color-main ellipsis'} onDoubleClick={() => setOnEdit(true)}>
                        {value?.label}
                    </p>
                </div>
                <div className={styleIconEdit} onClick={() => setOnEdit(true)} />
            </div>
        );
};

export default AppFlippedSelect;
