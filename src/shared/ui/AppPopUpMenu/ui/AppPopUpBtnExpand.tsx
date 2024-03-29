import { FC, MouseEvent } from 'react';

interface IPopUpMenuBtnExpand {
    onExpand: boolean;
    onClick: (e: MouseEvent) => void;
}

const AppPopUpBtnExpand: FC<IPopUpMenuBtnExpand> = ({ onExpand, onClick }) => {
    return (
        <div className={'pop-up-menu__item'} onClick={onClick}>
            <div className={'i-ri-expand-up-down-line c-color-second'} />
            <p>{onExpand ? 'Свернуть' : 'Развернуть'}</p>
        </div>
    );
};

export default AppPopUpBtnExpand;
