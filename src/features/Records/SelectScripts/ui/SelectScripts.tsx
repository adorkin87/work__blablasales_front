import { SyntheticEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// mui
import { Option, Select, Stack, Typography } from '@mui/joy';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';

// store
import StoreItemList from '../../../../shared/store/baseStoreList.ts';

interface SelectScript {
    selectedScript: number;
    setSelectedScript: (newValue: number) => void;
}

const SelectScripts = observer(({ selectedScript, setSelectedScript }: SelectScript) => {
    const [scriptListStore] = useState(() => new StoreItemList(import.meta.env.VITE_ENDPOINT_SCRIPT));

    useEffect((): void => {
        scriptListStore.getList();
    }, []);

    const handleSelectChange = (_e: SyntheticEvent | null, selectedValue: number | null): void => {
        if (selectedValue !== null) {
            setSelectedScript(selectedValue);
        }
    };

    return (
        <Stack direction={'column'} gap={1}>
            <Typography>Скрипт</Typography>
            <Select
                startDecorator={<SubjectRoundedIcon />}
                value={selectedScript}
                sx={{ width: 250 }}
                onChange={handleSelectChange}>
                <Option value={0}>Не выбрано...</Option>
                {Object.entries(scriptListStore.value).map((script) => (
                    <Option key={script[1]['script_id']} value={script[1]['script_id']}>
                        {script[1]['script_name']}
                    </Option>
                ))}
            </Select>
        </Stack>
    );
});

export default SelectScripts;
