import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// mui
import { Table, Stack, Box } from '@mui/joy';

// component
import AppBtnEdit from '../../../shared/ui/AppBtnEdit';
import AppBtnDel from '../../../shared/ui/AppBtnDel';

// func
import { formatDate } from '../../../shared/lib/formateDate.ts';

// store
import StoreItemList from '../../../shared/store/baseStoreList.ts';
import ModalConfirmDel from '../../ModalConfirmDel';

const ManagerList = observer(() => {
    const navigate = useNavigate();

    const [modalProps, setModalProps] = useState<{ open: boolean; selValue: number | string | false }>({
        open: false,
        selValue: false
    });

    const [managerListStore] = useState(() => new StoreItemList('http://10.10.0.106:8001/api/v1/agent'));

    useEffect(() => {
        managerListStore.getList();
    }, []);

    const handleBtnDel = (itemID: number | string): void => {
        setModalProps({ open: true, selValue: itemID });
    };

    return (
        <>
            <Table stickyHeader borderAxis={'bothBetween'}>
                <thead>
                    <tr>
                        <th>Дата добавления</th>
                        <th>ФИО</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(managerListStore.value).map((manager) => (
                        <tr key={manager[1]['agent_id']}>
                            <td>{formatDate(manager[1]['adding_date'])}</td>
                            <td>{manager[1]['agent_name']}</td>
                            <td>
                                <Stack
                                    justifyContent={manager[1]['agent_comment'] ? 'space-between' : 'right'}
                                    alignItems={'center'}>
                                    {manager[1]['agent_comment']}
                                    <Box>
                                        <AppBtnEdit
                                            onClick={() => navigate('/profile/managers/' + manager[1]['agent_id'])}
                                        />
                                        <AppBtnDel onClick={() => handleBtnDel(manager[1]['agent_id'])} />
                                    </Box>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalConfirmDel
                open={modalProps.open}
                setOpen={setModalProps}
                handleDel={() => managerListStore.delItem(modalProps.selValue)}
            />
        </>
    );
});

export default ManagerList;
