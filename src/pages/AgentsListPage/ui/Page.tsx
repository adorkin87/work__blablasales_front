import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

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
    //agentHandlers

    const handleBtnAdd = () => {
        agentStore.createNewAgent();
        setShowAgentCard(true);
    };

    const handleBtnSave = async () => {
        agentStore.data?.id ? agentStore.upd(agentStore.data.id) : agentStore.add();
        setShowAgentCard(false);
        rootStore.agentsList.getList();
    };

    const handleMenuEdit = (e: MouseEvent, itemID: string) => {
        e.stopPropagation();
        agentStore.createNewAgent();
        agentStore.get(itemID);
        setShowAgentCard(true);
    };

    const handleMenuDel = async (e: MouseEvent, itemID: string) => {
        e.stopPropagation();
        rootStore.agentsList.del(itemID);
        rootStore.agentsList.getList();
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
                    <AgentsList
                        data={rootStore?.agentsList.data}
                        handleMenuEdit={handleMenuEdit}
                        handleMenuDel={handleMenuDel}
                    />
                </AppLoadingOverlay>
            </div>
            <AppDock
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
