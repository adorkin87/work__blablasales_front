import { useEffect } from 'react';
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
import managerListStore from '../model/store/managerList.store.ts';

const ManagerList = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {
        managerListStore.getList();
    }, []);

    const handleBtnDel = () => {};

    return (
        <Table stickyHeader borderAxis={'bothBetween'} size={'sm'}>
            <thead>
                <tr>
                    <th colSpan={1}>Дата добавления</th>
                    <th colSpan={1}>ФИО</th>
                    <th colSpan={1}>Комментарий</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(managerListStore.value).map((manager) => (
                    <tr key={manager[0]}>
                        <td>{formatDate(manager[1]['adding_date'])}</td>
                        <td>{manager[1]['agent_name']}</td>
                        <td>
                            <Stack justifyContent={'space-between'}>
                                {manager[1]['agent_comment']}
                                <Box>
                                    <AppBtnEdit onClick={() => navigate('/profile/managers/' + manager[0])} />
                                    <AppBtnDel onClick={handleBtnDel} />
                                </Box>
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
});

export default ManagerList;
