import { FC, MouseEvent } from 'react';

//types
import type { Column } from '@table-library/react-table-library/compact';
import type { TAgent } from '../types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';

interface ITableRecordsList {
    data?: TAgent[] | null;
    rowProps?: { onClick: (item: Required<TAgent>) => void };
}

const handleBtnMore = (e: MouseEvent, itemID: string) => {
    e.stopPropagation();
    console.log(itemID);
};

const AgentsList: FC<ITableRecordsList> = ({ data, rowProps }) => {
    const columns: Column<Required<TAgent>>[] = [
        {
            label: 'Имя',
            renderCell: (item) => item.attributes.name,
            resize: true
        },
        {
            label: 'Email',
            renderCell: (item) => item.attributes.email,
            resize: true
        },
        {
            label: 'Телефон',
            renderCell: (item) => item.attributes.phone,
            resize: true
        },
        {
            label: 'Комментарий',
            renderCell: (item) => (
                <div className={'flex items-center justify-between gap-2'}>
                    <div className={'ellipsis'}>{item.attributes.comment}</div>
                    <div
                        className={'h-6 px-1 flex items-center justify-center group'}
                        onClick={(e) => handleBtnMore(e, item.id)}>
                        <div className={'i-ri-more-2-fill c-color-second/75 group-hover:c-#212227'} />
                    </div>
                </div>
            )
        }
    ];

    return <AppTable name={'AgentsList'} data={{ nodes: data ?? [] }} columns={columns} rowProps={rowProps} />;
};

export default AgentsList;
