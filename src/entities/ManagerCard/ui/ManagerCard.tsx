import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// mui
import { Input, Stack, Typography, Button } from '@mui/joy';

// func
import { isEqual } from 'lodash';

// store
import StoreItem from '../../../shared/store/baseStoreItem.ts';

interface ManagerCard {
    managerID: number | false;
}

const ManagerCard = observer(({ managerID }: ManagerCard) => {
    const navigate = useNavigate();

    const [changeValue, setChangeValue] = useState<boolean>(false);

    const [managerCardStore] = useState(() => new StoreItem('http://10.10.0.106:8001/api/v1/agent'));

    useEffect(() => {
        managerID && managerCardStore.getItem({ agent_id: managerID });
    }, []);

    useEffect(() => {
        if (!managerID && Object.hasOwn(managerCardStore.value, 'agent_id')) {
            navigate(`/profile/managers/${managerCardStore.value['agent_id']}`);
        }
    }, [managerCardStore.value]);

    const handleBtnSave = (): void => {
        managerID ? managerCardStore.updItem(managerID) : managerCardStore.addItem();
    };

    const handleInputChange = (field: string, newValue: string): void => {
        managerCardStore.updStoreValue(field, newValue);
        isEqual(managerCardStore.initValue, managerCardStore.value) ? setChangeValue(true) : setChangeValue(false);
    };

    return (
        <Stack direction={'column'} gap={1}>
            <Typography marginBottom={4} level={'title-lg'}>
                Менеджер
            </Typography>
            <Input
                placeholder={'ФИО'}
                value={managerCardStore.value['agent_name'] ?? ''}
                onChange={(e) => handleInputChange('agent_name', e.target.value)}
                sx={{ width: '500px' }}
            />
            <Input
                placeholder={'Комментарий'}
                value={managerCardStore.value['agent_comment'] ?? ''}
                onChange={(e) => handleInputChange('agent_comment', e.target.value)}
                sx={{ width: '500px' }}
            />
            <Stack marginTop={4} width={500} justifyContent={'right'} gap={2}>
                <Button disabled={changeValue} onClick={handleBtnSave}>
                    Сохранить
                </Button>
                <Button onClick={() => navigate(-1)}>Отмена</Button>
            </Stack>
        </Stack>
    );
});

export default ManagerCard;
