import { useContext, useEffect, useState } from 'react';

import AppSelect from 'src/shared/ui/AppSelect';

import RootStoreContext from 'src/app/providers/rootStore.context.ts';
import { SingleValue } from 'react-select';

const options = [
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' }
];

const SelectCntRowTable = () => {
    const rootStore = useContext(RootStoreContext);
    const [value, setValue] = useState<{ value: number; label: string } | null>(rootStore?.viewer.conf.cntRowTable!);

    useEffect(() => {
        localStorage.setItem('cntRowTable', JSON.stringify(value));
    }, [value]);

    const handleNewValue = (newValue: SingleValue<{ value: number; label: string }>) => {
        if (!newValue) return;

        setValue(newValue);
        rootStore?.viewer.conf.changeCntRowTable(newValue);
        localStorage.setItem('cntRowTable', JSON.stringify(newValue));
    };

    return <AppSelect label={'Показывать по:'} value={value} options={options} setNewValue={handleNewValue} />;
};

export default SelectCntRowTable;
