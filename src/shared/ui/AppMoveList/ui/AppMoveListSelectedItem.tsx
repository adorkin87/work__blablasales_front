import { FC } from 'react';
import AppPopUpImportant from '../../../../features/AppPopUpImportant';

interface IProps {
    name: string;
    important?: number;
    setImportant?: (important: number) => void;
    onClick: () => void;
}

const AppMoveListSelectedItem: FC<IProps> = ({ name, important, setImportant, onClick }) => {
    return (
        <div className={'flex items-center justify-between gap-2 cursor-pointer'}>
            <div className={'flex items-center justify-between gap-2 pr-2 group'} onClick={onClick}>
                <div className={'i-ri:arrow-left-s-line opacity-0 group-hover:opacity-100 transition-100'} />
                <p className={'text-sm group-hover:underline transition-100'}>{name}</p>
            </div>
            {important && <AppPopUpImportant important={important} setImportant={setImportant} />}
        </div>
    );
};

export default AppMoveListSelectedItem;
