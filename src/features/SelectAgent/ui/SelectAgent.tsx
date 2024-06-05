import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import type { SingleValue } from 'react-select';

import AppSelect from 'src/shared/ui/AppSelect';

//store
import RootStoreContext from 'src/app/providers/rootStore.context.ts';

interface IProps {
    setSelectedAgentID: (newValue: string | null) => void;
}

const SelectAgent: FC<IProps> = observer(({ setSelectedAgentID }) => {
    const rootStore = useContext(RootStoreContext)!;

    //variables
    const sourceData: { agentID: string; agentName: string; valueSelect: number }[] = [];
    rootStore.agentsList.data.forEach((agent, index) => {
        sourceData.push({ agentID: agent.id!, agentName: agent.attributes.name, valueSelect: index });
    });

    //*************************************************************************************************
    //handlers

    const handleSelectAgent = (newValue: SingleValue<{ value: number; label: string }>) => {
        if (!newValue) {
            setSelectedAgentID(null);
            return;
        }
        setSelectedAgentID(sourceData.find((item) => item.valueSelect === newValue.value)!.agentID);
    };

    //*************************************************************************************************
    //select data

    const options: { value: number; label: string }[] = sourceData.map((agent) => ({
        value: agent.valueSelect,
        label: agent.agentName
    }));

    //*************************************************************************************************
    //render

    return <AppSelect label={'Менеджер:'} isClearable={true} options={options} setNewValue={handleSelectAgent} />;
});

export default SelectAgent;
