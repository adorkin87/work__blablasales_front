import { useState, FC, ReactNode } from 'react';
import { Dock } from 'react-dock';

interface IProps {
    title?: string;
    onShow: boolean;
    setOnShow: (show: boolean) => void;
    children: ReactNode;
    handleBtnSave: () => void;
    stateBtnSave?: boolean;
}

const AppDock: FC<IProps> = ({ title, onShow, setOnShow, children, handleBtnSave, stateBtnSave }) => {
    const [sizeDock, setSizeDock] = useState<number>(500);

    const handleResizeDock = (size: number) => {
        if (size < 500) {
            setSizeDock(500);
            return;
        }
        if (size > window.innerWidth) {
            setSizeDock(window.innerWidth);
            return;
        }
        setSizeDock(size);
    };

    return (
        <Dock
            position={'right'}
            isVisible={onShow}
            fluid={false}
            onVisibleChange={() => setOnShow(false)}
            size={sizeDock}
            onSizeChange={handleResizeDock}
            dockStyle={{
                minWidth: '500px',
                maxWidth: '100wh',
                padding: '2rem 1rem',
                backgroundColor: '#efefef'
            }}>
            <div className={'h-full flex flex-col justify-between overflow-hidden'}>
                <div className={'overflow-auto'}>
                    {title && (
                        <div className={'top-panel'}>
                            <p className={'title'}>{title}</p>
                        </div>
                    )}
                    {children}
                </div>
                <div className={'pl-4 flex gap-4'}>
                    <button className={'btn'} disabled={stateBtnSave} onClick={handleBtnSave}>
                        Сохранить
                    </button>
                    <button
                        className={
                            'px-2 fw-600 text-sm c-color-second b-style-none cursor-pointer hover:c-color-main transition-100'
                        }
                        onClick={() => setOnShow(false)}>
                        Отменить
                    </button>
                </div>
            </div>
        </Dock>
    );
};

export default AppDock;
