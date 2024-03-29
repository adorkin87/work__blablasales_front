import { FC } from 'react';

//types
import { Column } from '@table-library/react-table-library/compact';
import { TRecord } from 'src/entities/record/types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';

interface ITableRecordsList {
    data?: TRecord[] | null;
}

const TableRecordsList: FC<ITableRecordsList> = ({ data }) => {
    const columns: Column<Required<TRecord>>[] = [
        {
            label: 'Дата',
            renderCell: (item) => item.attributes.upload_date.toLocaleDateString(),
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
            renderCell: (item) => item.attributes.agent_name,
            resize: true
        },
        {
            label: 'Скрипт',
            renderCell: (item) => item.attributes.script_name,
            resize: true
        },
        {
            label: 'Качество разговора',
            renderCell: (item) => item.attributes.kpiQuality,
            resize: true
        },
        {
            label: 'Выполнение скрипта, %',
            renderCell: (item) => item.attributes.kpiPercent
        }
    ];

    return <AppTable name={'RecordsList'} data={{ nodes: data ?? [] }} columns={columns} />;
};

export default TableRecordsList;
