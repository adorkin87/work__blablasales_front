import { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

//mui
import { Table } from '@mui/joy';

interface ManagerList {
    editButton?: ReactElement;
    delButton?: ReactElement;
}

const ManagerList = observer(({ editButton, delButton }: ManagerList) => {
    return (
        <Table stickyHeader size={'sm'}>
            <thead>
                <tr>
                    <th colSpan={1}>Дата добавления</th>
                    <th colSpan={1}>ФИО</th>
                    <th colSpan={2}>Комментарий</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td align={'right'}>
                        {editButton}
                        {delButton}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
});

export default ManagerList;
