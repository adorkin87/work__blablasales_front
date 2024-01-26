import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// mui
import { Sheet, Stack, Table, Tooltip } from '@mui/joy';

//components
import { LeftPanelRecords } from 'src/widgets/LeftPanel';
import RightPanel from 'src/shared/ui/RightPanel';

//func
import { formatDate } from 'src/shared/lib/formateDate.ts';
import { limitStr } from 'src/shared/lib/limitStr.ts';

// store
import StoreItemList from 'src/shared/store/baseStoreList.ts';

const RecordsListPage = observer(() => {
    const [recordList] = useState(() => new StoreItemList(import.meta.env.VITE_ENDPOINT_RECORD));

    useEffect(() => {
        recordList.getList();
    }, []);

    // *************************************************************************************************
    // render

    return (
        <Stack>
            <LeftPanelRecords />
            <RightPanel>
                <Sheet sx={{ overflow: 'auto', bgcolor: '#fff' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Загружен</th>
                                <th>Название</th>
                                <th>Менеджер</th>
                                <th>Скрипт</th>
                                <th>Длительность</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(recordList.value).map((record: any) => (
                                <tr key={record[1]['record_id']}>
                                    <td>{formatDate(record[1]['upload_date'])}</td>
                                    <td>{record[1]['agent_name']}</td>
                                    {record[1]['file_name'].length >= 15 ? (
                                        <Tooltip title={record[1]['file_name']} placement={'top-start'}>
                                            <td>{limitStr(record[1]['file_name'], 15)}</td>
                                        </Tooltip>
                                    ) : (
                                        <td>{record[1]['file_name']}</td>
                                    )}
                                    <td>{record[1]['script_name']}</td>
                                    <td>{record[1]['file_length']}</td>
                                    <td>{record[1]['status']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
            </RightPanel>
        </Stack>
    );
});

export default RecordsListPage;
