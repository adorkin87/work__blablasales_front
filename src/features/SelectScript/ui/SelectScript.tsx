import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import type { SingleValue } from 'react-select';

import AppSelect from 'src/shared/ui/AppSelect';

//store
import RootStoreContext from 'src/app/providers/rootStore.context.ts';

interface IProps {
    setSelectedScriptID: (newValue: string | null) => void;
}

const SelectScript: FC<IProps> = observer(({ setSelectedScriptID }) => {
    const rootStore = useContext(RootStoreContext)!;

    //variables
    const sourceData: { scriptID: string; scriptName: string; valueSelect: number }[] = [];
    rootStore.scriptsList.data.forEach((script, index) => {
        sourceData.push({ scriptID: script.id!, scriptName: script.attributes.name, valueSelect: index });
    });

    //*************************************************************************************************
    //handlers

    const handleSelectAgent = (newValue: SingleValue<{ value: number; label: string }>) => {
        if (!newValue) {
            setSelectedScriptID(null);
            return;
        }
        setSelectedScriptID(sourceData.find((item) => item.valueSelect === newValue.value)!.scriptID);
    };

    //*************************************************************************************************
    //select data

    // const value = selectedAgentID ? sourceData.find((agent) => agent.agentID === selectedAgentID)! : null;

    const options: { value: number; label: string }[] = sourceData.map((script) => ({
        value: script.valueSelect,
        label: script.scriptName
    }));

    //*************************************************************************************************
    //render

    return <AppSelect label={'Скрипт:'} isClearable={true} options={options} setNewValue={handleSelectAgent} />;
});

export default SelectScript;
