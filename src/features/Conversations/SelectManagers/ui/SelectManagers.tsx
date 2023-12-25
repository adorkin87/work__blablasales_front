import { SyntheticEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// mui
import { Option, Select, Stack, Typography } from '@mui/joy';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

// store
import StoreItemList from '../../../../shared/store/baseStoreList.ts';

interface SelectManagers {
    selectedManager: number;
    setSelectedManager: (newValue: number) => void;
}

const SelectManagers = observer(({ selectedManager, setSelectedManager }: SelectManagers) => {
    const [managerListStore] = useState(() => new StoreItemList('http://10.10.0.106:8001/api/v1/agent'));

    useEffect((): void => {
        managerListStore.getList();
    }, []);

    const handleSelectChange = (_e: SyntheticEvent | null, selectedValue: number | null): void => {
        if (selectedValue !== null) {
            setSelectedManager(selectedValue);
        }
    };

    return (
        <Stack direction={'column'} gap={1}>
            <Typography>Менеджер</Typography>
            <Select
                startDecorator={<SupportAgentRoundedIcon />}
                value={selectedManager}
                sx={{ width: 250 }}
                onChange={handleSelectChange}>
                <Option value={0}>Не выбрано...</Option>
                {Object.entries(managerListStore.value).map((manager) => (
                    <Option key={manager[1]['agent_id']} value={manager[1]['agent_id']}>
                        {manager[1]['agent_name']}
                    </Option>
                ))}
            </Select>
        </Stack>
    );
});

export default SelectManagers;
