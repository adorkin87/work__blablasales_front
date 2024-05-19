import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

//styles
import cls from './LeftPanel.module.scss';

//stores
import RootStoreContext from 'src/app/providers/rootStore.context.ts';

//initConst
const initFullWidth: boolean =
    localStorage.getItem('leftPanelFullWidth') === null
        ? true
        : localStorage.getItem('leftPanelFullWidth') === 'true' && true;
// const initFullWidth = localStorage.getItem('leftPanelFullWidth');

const LeftPanel = () => {
    const rootStore = useContext(RootStoreContext);
    const location = useLocation();
    const [fullWidth, setFullWidth] = useState<boolean | null>(initFullWidth);

    const currentSection: string = location.pathname.split('/')[1];

    const handleBtnResize = (): void => {
        localStorage.setItem('leftPanelFullWidth', String(!fullWidth));
        setFullWidth(!fullWidth);
    };

    // *************************************************************************************************
    // render

    return (
        <div className={`${cls.leftPanel} ${!fullWidth ? cls.leftPanel_small : ''}`}>
            <div>
                <Link className={'mb-12 pl-4 flex gap-4 decoration-none'} to={'/'}>
                    <img src={'/images/logo.png'} height={40} />
                    <p className={'text-8 c-#fff'}>BlaBlaSales</p>
                </Link>

                <div>
                    <Link className={'sb_link mb group'} to={'/'}>
                        <div className={'i-ri-user-voice-fill sb_icon'} />
                        <p className={'sb_text'}>Записи</p>
                    </Link>
                    <div className={'mb-2 mx-6 b-1 b-style-solid b-color-color-second/50'} />
                    <Link className={'sb_link mb group'} to={'/setup'}>
                        <div className={'i-ri-dashboard-fill sb_icon'} />
                        <p className={'sb_text'}>Компании</p>
                    </Link>
                    <Link className={'sb_link mb group'} to={'/setup/scripts'}>
                        <div className={'i-ri-file-list-fill sb_icon'} />
                        <p className={'sb_text'}>Сценарии</p>
                    </Link>
                    <Link className={'sb_link group'} to={'/setup/dicts'}>
                        <div className={'i-ri-book-marked-fill sb_icon'} />
                        <p className={'sb_text'}>Маркеры</p>
                    </Link>
                    <div className={'mt-2 mx-6 mb b-1 b-style-solid b-color-color-second/50'} />
                    <Link className={'sb_link mb group'} to={'/analytics'}>
                        <div className={'i-ri-bar-chart-fill sb_icon'} />
                        <p className={'sb_text'}>Аналитика</p>
                    </Link>
                    <div className={'mt-2 mx-6 mb b-1 b-style-solid b-color-color-second/50'} />
                    <Link className={'sb_link mb group'} to={'/agents'}>
                        <div className={'i-ri-team-fill sb_icon'} />
                        <p className={'sb_text'}>Менеджеры</p>
                    </Link>
                    <div className={'mt-2 mx-6 mb b-1 b-style-solid b-color-color-second/50'} />
                    <Link className={'sb_link mb group'} to={'/integrations'}>
                        <div className={'i-ri-puzzle-2-fill sb_icon'} />
                        <p className={'sb_text'}>Интеграции</p>
                    </Link>
                </div>
            </div>

            <div className={'flex flex-col gap-4'}>
                <Link className={'sb_link group'} to={'/profile'}>
                    <div className={'i-ri-settings-3-line sb_icon'} />
                    <p className={'sb_text'}>Профиль</p>
                </Link>
                <Link className={'sb_link group'} to={'/support'}>
                    <div className={'i-ri-question-line sb_icon'} />
                    <p className={'sb_text'}>Поддержка</p>
                </Link>
                <div className={'sb_link group'} onClick={() => rootStore?.viewer.auth.logout()}>
                    <div className={'i-ri-logout-circle-line sb_icon'} />
                    <p className={'sb_text'}>Выйти</p>
                </div>
            </div>

            <div
                className={'absolute top-0 right--1px h-dvh w-1 cursor-col-resize transition-100 hover:bg-color-second'}
                onClick={handleBtnResize}
            />
        </div>
    );
};

export default LeftPanel;
