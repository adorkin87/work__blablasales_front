import { useState, FC, ReactNode } from 'react';
import { Dock } from 'react-dock';

interface IAppDock {
    title?: string;
    onShow: boolean;
    setOnShow: (show: boolean) => void;
    children: ReactNode;
    handleBtnSave: () => void;
    stateBtnSave?: boolean;
}

const AppDock: FC<IAppDock> = ({ title, onShow, setOnShow, children, handleBtnSave, stateBtnSave }) => {
    const [sizeDock, setSizeDock] = useState<number>(400);

    const handleResizeDock = (size: number) => {
        if (size < 400) {
            setSizeDock(400);
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
                minWidth: '400px',
                maxWidth: '100wh',
                padding: '2rem 1rem',
                backgroundColor: '#efefef'
            }}>
            <div className={'h-full flex flex-col justify-between overflow-hidden'}>
                <div>
                    {title && (
                        <div className={'top-panel'}>
                            <p className={'title'}>{title}</p>
                        </div>
                    )}
                    {children}
                </div>
                <div className={'flex justify-end gap-4'}>
                    <button className={'btn'} onClick={() => setOnShow(false)}>
                        Закрыть
                    </button>
                    <button className={'btn'} disabled={stateBtnSave} onClick={handleBtnSave}>
                        Сохранить
                    </button>
                </div>
            </div>
        </Dock>
    );
};

export default AppDock;
