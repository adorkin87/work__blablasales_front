import { FC, useState } from 'react';
import AsyncSelect from 'react-select/async';
import AppSelect from 'src/shared/ui/AppSelect';

interface SelectManagersProps {
    selectedManager: number;
    setSelectedManager: (newValue: number) => void;
}

const SelectManagers: FC<SelectManagersProps> = ({ selectedManager, setSelectedManager }) => {
    const [data, setData] = useState<any>(null);

    const options = [
        { value: 1, label: 'Chocolate' },
        { value: 2, label: 'Strawberry' },
        { value: 3, label: 'Vanilla' }
    ];

    const promiseOptions = () =>
        new Promise<any>((resolve) => {
            setTimeout(() => {
                resolve(options);
            }, 1000);
        });

    return <AppSelect label={'Менеджер:'} isClearable={true} options={options} setNewValue={setSelectedManager} />;
};

export default SelectManagers;
