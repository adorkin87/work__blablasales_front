import { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

//components
import AppLoadingOverlay from 'src/shared/ui/AppLoadingOverlay';
import ScriptsList from 'src/entities/script/ui/ScriptList.tsx';

// stores
import RootStoreContext from 'src/app/providers/rootStore.context.ts';
import { ScriptCard, ScriptCardStore } from 'src/entities/script';
import AppDock from 'src/shared/ui/AppDock';

const ScriptsListPage = observer(() => {
    //ref
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    //stores
    const rootStore = useContext(RootStoreContext)!;
    const [scriptStore] = useState(() => new ScriptCardStore(rootStore));

    //states
    const [showScriptCard, setShowScriptCard] = useState<boolean>(false);
    const [disabledBtnSave, setDisabledBtnSave] = useState<boolean>(true);
    const [activeScriptCardTab, setActiveScriptCardTab] = useState<string>('marker');

    //**************************************************************************************************
    //effects

    useEffect(() => {
        if (tableWrapperRef.current === null) return;
        const tableWrapper: HTMLDivElement = tableWrapperRef.current;
        tableWrapper.style.height = window.innerHeight - 16 - tableWrapper.offsetTop - 16 + 'px';
    }, []);

    useEffect(() => {
        if (!scriptStore.data) return;
        if (!scriptStore.data.attributes.name) {
            setDisabledBtnSave(true);
            return;
        }
        setDisabledBtnSave(!scriptStore.changed);
    }, [scriptStore.changed, scriptStore.data?.attributes.name]);

    //**************************************************************************************************
    //handlers

    const handleBtnAdd = (): void => {
        scriptStore.createNewScript();
        setActiveScriptCardTab('marker');
        setShowScriptCard(true);
    };

    const handleBtnSave = async () => {
        scriptStore.data?.id ? await scriptStore.upd(scriptStore.data.id) : await scriptStore.add();
        setShowScriptCard(false);
        await rootStore.scriptsList.getList();
    };

    const handleMenuEdit = (itemID: string) => {
        scriptStore.createNewScript();
        setActiveScriptCardTab('marker');
        void scriptStore.get(itemID);
        setShowScriptCard(true);
    };

    const handleMenuDel = async (itemID: string) => {
        await rootStore?.scriptsList.del(itemID);
        await rootStore?.scriptsList.getList();
    };

    //**************************************************************************************************
    //render

    return (
        <>
            <div className={'h-full p-4'}>
                <div className={'top-panel'}>
                    <p className={'title'}>Список скриптов</p>
                    <button
                        className={'btn active:bg-color-main'}
                        disabled={rootStore?.dictsList.state === 'pending'}
                        onClick={handleBtnAdd}>
                        Добавить
                    </button>
                </div>
                <AppLoadingOverlay ref={tableWrapperRef} active={rootStore?.scriptsList.state === 'pending'}>
                    <ScriptsList
                        data={rootStore?.scriptsList.data}
                        included={rootStore?.scriptsList.included}
                        handleMenuEdit={handleMenuEdit}
                        handleMenuDel={handleMenuDel}
                    />
                </AppLoadingOverlay>
            </div>
            <AppDock
                onShow={showScriptCard}
                setOnShow={setShowScriptCard}
                handleBtnSave={handleBtnSave}
                stateBtnSave={disabledBtnSave}>
                <ScriptCard
                    scriptStore={scriptStore}
                    rootStore={rootStore}
                    activeTabs={activeScriptCardTab}
                    setActiveTabs={setActiveScriptCardTab}
                />
            </AppDock>
        </>
    );
});

export default ScriptsListPage;
