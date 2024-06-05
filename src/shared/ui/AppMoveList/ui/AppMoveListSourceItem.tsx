import { FC } from 'react';

interface IProps {
    name: string;
    onClick: () => void;
}

const AppMoveListSourceItem: FC<IProps> = ({ name, onClick }) => {
    return (
        <div className={'flex items-center justify-between cursor-pointer group'} onClick={onClick}>
            <p className={'text-sm group-hover:underline transition-100'}>{name}</p>
            <div className={'i-ri:arrow-right-s-line opacity-0 group-hover:opacity-100 transition-100'} />
        </div>
    );
};

export default AppMoveListSourceItem;
