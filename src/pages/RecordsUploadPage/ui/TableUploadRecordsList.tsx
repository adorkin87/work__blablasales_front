import { FC } from 'react';

//types
import { Column } from '@table-library/react-table-library/compact';

//components
import AppTable from 'src/shared/ui/AppTable';

interface ITableUploadRecordsList {
    data?: TUploadRecord[] | null;
}

const TableUploadRecordsList: FC<ITableUploadRecordsList> = ({ data }) => {
    const columns: Column<TUploadRecord>[] = [
        {
            label: 'Имя файла',
            renderCell: (item) => item.file_name,
            resize: true
        },
        {
            label: 'Длительность',
            renderCell: (item) => item.file_length
        }
    ];

    return <AppTable name={'UploadRecordsList'} data={{ nodes: data ?? [] }} columns={columns} />;
};

export default TableUploadRecordsList;
