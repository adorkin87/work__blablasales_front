import { FC, MouseEvent } from 'react';

interface IPopUpMenuBtnDel {
    onClick: (e: MouseEvent) => void;
}

const AppPopUpBtnDel: FC<IPopUpMenuBtnDel> = ({ onClick }) => {
    return (
        <div className={'pop-up-menu__item'} onClick={onClick}>
            <div className={'i-ri-delete-bin-2-fill c-red'} />
            <p>Удалить</p>
        </div>
    );
};

export default AppPopUpBtnDel;
