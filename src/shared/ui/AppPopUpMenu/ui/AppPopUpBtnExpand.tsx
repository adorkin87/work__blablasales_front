import { FC } from 'react';

interface IPopUpMenuBtnExpand {
    onExpand: boolean;
}

const AppPopUpBtnExpand: FC<IPopUpMenuBtnExpand> = ({ onExpand }) => {
    return (
        <div className={'pop-up-menu__item'}>
            <div className={'i-ri-expand-up-down-line c-color-second'} />
            <p className={'c-color-main'}>{onExpand ? 'Свернуть' : 'Развернуть'}</p>
        </div>
    );
};

export default AppPopUpBtnExpand;
