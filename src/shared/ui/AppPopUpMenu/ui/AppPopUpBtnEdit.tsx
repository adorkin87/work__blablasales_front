import { FC, MouseEvent } from 'react';

interface IPopUpMenuBtnEditProps {
    onClick: (e: MouseEvent) => void;
}

const AppPopUpBtnEdit: FC<IPopUpMenuBtnEditProps> = ({ onClick }) => {
    return (
        <div className={'pop-up-menu__item'} onClick={onClick}>
            <div className={'i-ri-pencil-fill c-color-second'} />
            <p>Редактировать</p>
        </div>
    );
};

export default AppPopUpBtnEdit;
