import { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import type { TAgent } from 'src/entities/agent';

//src components
import AppLoadingOverlay from 'src/shared/ui/AppLoadingOverlay';
import AppDock from 'src/shared/ui/AppDock';
import { AgentsList, AgentCard } from 'src/entities/agent';

//stores
import RootStoreContext from 'src/app/providers/rootStore.context.ts';
import { AgentCardStore } from 'src/entities/agent';

const Page = observer(() => {
    //ref
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    //stores
    const rootStore = useContext(RootStoreContext)!;
    const [agentStore] = useState(() => new AgentCardStore(rootStore));

    //states
    const [showAgentCard, setShowAgentCard] = useState<boolean>(false);
    const [disabledBtnSave, setDisabledBtnSave] = useState<boolean>(true);

    //**************************************************************************************************
    //effects

    useEffect(() => {
        if (tableWrapperRef.current === null) return;
        const tableWrapper: HTMLDivElement = tableWrapperRef.current;
        tableWrapper.style.height = window.innerHeight - 16 - tableWrapper.offsetTop - 16 + 'px';
    }, []);

    useEffect(() => {
        if (!agentStore.data) return;
        if (!agentStore.data.attributes.name) {
            setDisabledBtnSave(true);
            return;
        }
        setDisabledBtnSave(!agentStore.changed);
    }, [agentStore.changed, agentStore.data?.attributes.name]);

    //**************************************************************************************************
    //handlers

    const handleRowClick = (item: Required<TAgent>) => {
        agentStore.createNewAgent();
        void agentStore.get(item.id);
        setShowAgentCard(true);
    };

    const handleBtnAdd = () => {
        agentStore.createNewAgent();
        setShowAgentCard(true);
    };

    const handleBtnSave = async () => {
        agentStore.data?.id ? await agentStore.upd(agentStore.data.id) : await agentStore.add();
        setShowAgentCard(false);
        void rootStore.agentsList.get();
    };

    //**************************************************************************************************
    //render

    return (
        <>
            <div className={'h-full p-4'}>
                <div className={'top-panel'}>
                    <p className={'title'}>Список менеджеров</p>
                    <button
                        className={'btn active:bg-color-main'}
                        disabled={rootStore?.agentsList.state === 'pending'}
                        onClick={handleBtnAdd}>
                        Добавить
                    </button>
                </div>
                <AppLoadingOverlay ref={tableWrapperRef} active={rootStore?.agentsList.state === 'pending'}>
                    <AgentsList data={rootStore?.agentsList.data} rowProps={{ onClick: handleRowClick }} />
                </AppLoadingOverlay>
            </div>
            <AppDock
                // title={'Профиль менеджера'}
                onShow={showAgentCard}
                setOnShow={setShowAgentCard}
                handleBtnSave={handleBtnSave}
                stateBtnSave={disabledBtnSave}>
                <AgentCard agentStore={agentStore} />
            </AppDock>
        </>
    );
});

export default Page;