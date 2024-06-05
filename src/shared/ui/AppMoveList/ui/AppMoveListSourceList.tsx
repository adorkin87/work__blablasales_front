import { FC, ReactNode } from 'react';

interface IProps {
    title: string;
    children: ReactNode;
}

const AppMoveListSourceList: FC<IProps> = ({ title, children }) => {
    return (
        <div className={'flex flex-col gap-2 c-color-main'}>
            <p className={'fw-600 text-lg'}>{title}</p>
            {children}
        </div>
    );
};

export default AppMoveListSourceList;
