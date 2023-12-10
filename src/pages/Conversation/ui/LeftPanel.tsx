import { useCallback } from 'react';
import cls from './LeftPanel.module.scss';

import { Divider } from '@mui/joy';

const LeftPanel = () => {
    const panelRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop + 'px';
        }
    }, []);

    return (
        <div ref={panelRef} className={cls.panel}>
            <div className={cls.menu}>
                <p>Добавить аудио</p>
                <p>Список загрузок</p>
                <div className={cls.divider} />
                <p>Интеграции</p>
            </div>
        </div>
    );
};

export default LeftPanel;
