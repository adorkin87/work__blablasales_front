import { FC } from 'react';

//types
import type { Column } from '@table-library/react-table-library/compact';
import type { TAgent } from 'src/entities/agent';
import type { TScript } from 'src/entities/script';
import type { TRecord } from '../types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';
import AppPopUpMenu, { AppPopUpBtnDel } from 'src/shared/ui/AppPopUpMenu';

interface IProps {
    data?: TRecord[] | null;
    included: (TAgent | TScript)[];
    handleMenuDel: (itemID: string) => void;
}

const RecordList: FC<IProps> = ({ data, included, handleMenuDel }) => {
    const columns: Column<Required<TRecord>>[] = [
        {
            label: 'Дата',
            renderCell: (item) => new Date(item.attributes.upload_date).toLocaleDateString(),
            resize: true
        },
        {
            label: 'Имя файла',
            renderCell: (item) => item.attributes.file_name,
            resize: true
        },
        {
            label: 'Длительность',
            renderCell: (item) => item.attributes.file_length,
            resize: true
        },
        {
            label: 'Статус',
            renderCell: (item) => item.attributes.status,
            resize: true
        },
        {
            label: 'Менеджер',
            renderCell: (item) =>
                included.find(
                    (includedItem) =>
                        includedItem.type === 'agent' && includedItem.id === item.relationships.agent.data.id
                )?.attributes.name,
            resize: true
        },
        {
            label: 'Скрипт',
            renderCell: (item) =>
                included.find(
                    (includedItem) =>
                        includedItem.type === 'script' && includedItem.id === item.relationships.script.data.id
                )?.attributes.name,
            resize: true
        },
        {
            label: 'Качество разговора',
            renderCell: (item) => item.attributes.kpiQuality,
            resize: true
        },
        {
            label: 'Выполнение скрипта, %',
            renderCell: (item) => (
                <div className={'flex items-center justify-between'}>
                    <div className={'ellipsis'}>{item.attributes.kpiPercent ?? ''}</div>
                    <div className={'flex items-center justify-between gap-2'}>
                        <AppPopUpMenu
                            items={[
                                {
                                    elem: <AppPopUpBtnDel />,
                                    onClick: () => handleMenuDel(item.id)
                                }
                            ]}
                        />
                    </div>
                </div>
            )
        }
    ];

    return (
        <AppTable
            // name={'RecordList'}
            data={{ nodes: data ?? [] }}
            columns={columns}
        />
    );
};

export default RecordList;
