import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// mui
import { Table } from '@mui/joy';

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

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalSelectedItem, setModalSelectedItem] = useState<{ itemID?: number | string; itemName?: string }>({});

    const [managerListStore] = useState(() => new StoreItemList(import.meta.env.VITE_ENDPOINT_AGENT));

    useEffect(() => {
        managerListStore.getList();
    }, []);

    const handleBtnDel = (itemID: number | string, itemName: string): void => {
        setModalSelectedItem({ itemID, itemName });
        setModalOpen(true);
    };

    const handleDelItem = async (): Promise<void> => {
        if (modalSelectedItem.itemID) {
            await managerListStore.delItem(modalSelectedItem.itemID);
        }
        managerListStore.resetValue();
        managerListStore.getList();
    };

    return (
        <>
            <Table stickyHeader>
                <thead>
                    <tr>
                        <th colSpan={1}>Дата добавления</th>
                        <th colSpan={1}>ФИО</th>
                        <th colSpan={2}>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(managerListStore.value).map((manager) => (
                        <tr key={manager[1]['agent_id']}>
                            <td>{formatDate(manager[1]['adding_date'])}</td>
                            <td>{manager[1]['agent_name']}</td>
                            <td>{manager[1]['agent_comment']}</td>
                            <td align={'right'}>
                                <AppBtnEdit onClick={() => navigate('/profile/managers/' + manager[1]['agent_id'])} />
                                <AppBtnDel
                                    onClick={() => handleBtnDel(manager[1]['agent_id'], manager[1]['agent_name'])}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalConfirmDel
                open={modalOpen}
                setOpen={setModalOpen}
                handleDel={handleDelItem}
                text={modalSelectedItem['itemName']}
            />
        </>
    );
});

export default ManagerList;
