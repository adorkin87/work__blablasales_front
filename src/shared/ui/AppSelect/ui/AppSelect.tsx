import { FC, useEffect, useRef } from 'react';
import Select, { ActionMeta, SelectInstance, SingleValue } from 'react-select';

interface IAppSelect {
    label?: string;
    placeholder?: string;
    options: { value: number; label: string }[];
    value?: { value: number; label: string } | null;
    setNewValue: (
        newValue: SingleValue<{ value: number; label: string }>,
        actionMeta: ActionMeta<{ value: number; label: string }>
    ) => void;
    isClearable?: boolean;
    forceClear?: boolean;
}

const AppSelect: FC<IAppSelect> = ({ label, placeholder, options, value, setNewValue, isClearable, forceClear }) => {
    const ref = useRef<SelectInstance<{ value: number; label: string }> | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.clearValue();
        value && ref.current?.setValue(value, 'select-option');
    }, [forceClear]);

    return (
        <div>
            {label && <p className={'ml-2 text-sm'}>{label}</p>}
            <Select
                ref={ref}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        minHeight: 36,
                        boxShadow: 'none',
                        borderColor: state.menuIsOpen ? 'var(--color-main)' : 'var(--color-second)',
                        ':hover': {
                            borderColor: state.menuIsOpen ? 'var(--color-main)' : 'rgba(var(--color-main_rgb), .75)'
                        },
                        ':active': { borderColor: 'var(--color-main)' }
                    }),
                    dropdownIndicator: (baseStyles) => ({
                        ...baseStyles,
                        padding: 6
                    }),
                    clearIndicator: (baseStyles) => ({
                        ...baseStyles,
                        padding: 6
                    }),
                    menu: (baseStyles) => ({ ...baseStyles, zIndex: 50 }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isSelected ? 'var(--color-main)' : '',
                        ':hover': {
                            color: state.isSelected ? '#fff' : '#000',
                            backgroundColor: state.isSelected ? 'var(--color-main)' : 'rgba(var(--color-main_rgb), .25)'
                        }
                    })
                }}
                isSearchable={false}
                isClearable={isClearable}
                placeholder={placeholder ? placeholder : 'выберите...'}
                defaultValue={value}
                options={options}
                onChange={setNewValue}
            />
        </div>
    );
};

export default AppSelect;
