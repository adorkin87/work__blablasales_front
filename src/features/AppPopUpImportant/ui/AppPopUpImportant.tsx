import { FC, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import classNames from 'classnames';

import { DictPriority } from 'src/entities/script';

interface IProps {
    important: number;
    setImportant?: (important: number) => void;
}

const AppPopUpImportant: FC<IProps> = ({ important, setImportant }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickItems = (value: number) => {
        setIsOpen(false);
        setImportant && setImportant(value);
    };

    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger asChild>
                <div
                    className={classNames(
                        'shrink-0',
                        { 'i-ri:flag-2-line c-color-second': important === DictPriority.low },
                        { 'i-ri:flag-2-fill c-color-second': important === DictPriority.normal },
                        { 'i-ri:flag-2-fill c-orange': important === DictPriority.medium },
                        { 'i-ri:flag-2-fill c-red': important === DictPriority.high }
                    )}
                />
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className={'py-2 bg-white b-rd b b-solid b-color-color-second/50 z-100000000'}
                    sideOffset={5}>
                    <p className={'mb-2 px-4 fw-500 text-sm c-color-main'}>Важность</p>
                    <div
                        className={'px-4 py-1 flex items-center gap-1 cursor-pointer hover:bg-color-second/25'}
                        onClick={() => handleClickItems(DictPriority.high)}>
                        <div className={'i-ri:flag-2-fill c-red'} />
                        <p className={'text-sm fw-500 c-color-main'}>высокая</p>
                    </div>
                    <div
                        className={'px-4 py-1 flex items-center gap-1 cursor-pointer hover:bg-color-second/25'}
                        onClick={() => handleClickItems(DictPriority.medium)}>
                        <div className={'i-ri:flag-2-fill c-orange'} />
                        <p className={'text-sm fw-500 c-color-main'}>средняя</p>
                    </div>
                    <div
                        className={'px-4 py-1 flex items-center gap-1 cursor-pointer hover:bg-color-second/25'}
                        onClick={() => handleClickItems(DictPriority.normal)}>
                        <div className={'i-ri:flag-2-fill c-color-second'} />
                        <p className={'text-sm fw-500 c-color-main'}>обычная</p>
                    </div>
                    <div
                        className={'px-4 py-1 flex items-center gap-1 cursor-pointer hover:bg-color-second/25'}
                        onClick={() => handleClickItems(DictPriority.low)}>
                        <div className={'i-ri:flag-2-line c-color-second'} />
                        <p className={'text-sm fw-500 c-color-main'}>низкая</p>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default AppPopUpImportant;
