import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// mui
import { Input, Stack } from '@mui/joy';

// store
import StoreItem from '../../../shared/store/baseStoreItem.ts';

interface ManagerCard {
    managerID: number | false;
}

const ManagerCard = observer(({ managerID }: ManagerCard) => {
    const [managerCardStore] = useState(() => new StoreItem('http://10.10.0.106:8001/api/v1/agent'));

    console.log(managerID);

    useEffect(() => {
        managerID && managerCardStore.getItem({ agent_id: managerID });
    }, []);

    return (
        <Stack direction={'column'} gap={1}>
            <Input placeholder={'ФИО'} sx={{ width: '500px' }} />
            <Input placeholder={'Комментарий'} sx={{ width: '500px' }} />
        </Stack>
    );
});

export default ManagerCard;
