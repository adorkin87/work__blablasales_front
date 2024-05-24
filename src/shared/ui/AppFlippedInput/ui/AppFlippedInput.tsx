import { ChangeEvent, FC, KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

interface IAppFlippedInput {
    value?: string;
    setValue?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    type?: 'text' | 'password' | 'email' | 'phone';
    style?: {
        container?: { height?: string };
        input?: string;
        text?: string;
        placeholder?: string;
    };
    leftIcon?: ReactNode;
    del?: {
        icon?: ReactNode;
        onClick?: () => void;
    };
    actionPosition?: 'left' | 'right' | 'between';
}

const AppFlippedInput: FC<IAppFlippedInput> = ({
    value,
    setValue,
    placeholder,
    required,
    type,
    style,
    leftIcon,
    del,
    actionPosition
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [onEdit, setOnEdit] = useState<boolean>(false);

    useEffect(() => {
        // onEdit && inputRef.current && inputRef.current.focus();
    }, [onEdit]);

    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') setOnEdit(false);
    };

    const styleIconOk =
        'i-ri-check-fill flex-shrink-0 c-color-second/75 cursor-pointer  hover:c-color-main transition-100';
    const styleIconEdit =
        'i-ri-edit-2-fill flex-shrink-0 c-color-second/75 cursor-pointer opacity-0 transition-100 group-hover:opacity-100 hover:c-color-main';

    if (onEdit)
        return (
            <div
                className={classNames(
                    'w-full flex items-center gap-1 b-b-1 b-b-style-solid b-b-color-color-second/75',
                    { 'b-b-red/75': required && (!value || value.length === 0) },
                    style?.container?.height ?? 'h-7'
                )}>
                <div className={'w-full pl-2 flex items-center gap-1'}>
                    {leftIcon && leftIcon}
                    <input
                        ref={inputRef}
                        className={style?.input ?? 'py-1 text-sm c-color-main b-none outline-none bg-transparent'}
                        type={type}
                        value={value ?? ''}
                        placeholder={placeholder}
                        onKeyDown={handleOnKeyDown}
                        onChange={setValue}
                        onBlur={() => setOnEdit(false)}
                    />
                </div>
                {!(required && (!value || value.length === 0)) && (
                    <div className={styleIconOk} onClick={() => setOnEdit(false)} />
                )}
            </div>
        );
    else
        return (
            <div
                className={classNames(
                    'w-full flex items-center gap-1 overflow-hidden group',
                    style?.container?.height ?? 'h-7'
                )}>
                {value && value.length > 0 ? (
                    <div className={'pl-2 flex items-center gap-1'}>
                        {leftIcon && leftIcon}
                        <p
                            className={style?.text ?? 'text-sm c-color-main ellipsis'}
                            onDoubleClick={() => setOnEdit(true)}>
                            {value}
                        </p>
                    </div>
                ) : (
                    <p
                        className={
                            style?.placeholder ??
                            classNames('pl-2 text-xs c-color-second group-hover:c-color-main transition-100', {
                                'c-red/75 group-hover:c-red fw-500': required
                            })
                        }
                        onDoubleClick={() => setOnEdit(true)}>
                        {placeholder}
                    </p>
                )}
                <div
                    className={classNames(
                        'flex items-center gap-2',
                        {
                            'grow justify-end': actionPosition === 'right'
                        },
                        { 'grow justify-between': actionPosition == 'between' }
                    )}>
                    <div
                        className={classNames(styleIconEdit, {
                            'c-red/75  hover:c-red': required && (!value || value.length === 0)
                        })}
                        onClick={() => setOnEdit(true)}
                    />
                    <div
                        className={
                            'cursor-pointer c-red/50 opacity-0 group-hover:opacity-100 hover:c-red transition-100'
                        }
                        onClick={del?.onClick}>
                        {del?.icon}
                    </div>
                </div>
            </div>
        );
};

export default AppFlippedInput;
