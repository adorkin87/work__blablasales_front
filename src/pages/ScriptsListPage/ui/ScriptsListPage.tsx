import { useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

//components
import AppLoadingOverlay from 'src/shared/ui/AppLoadingOverlay';
import ScriptsList from 'src/entities/script/ui/ScriptList.tsx';

// stores
import RootStoreContext from 'src/app/providers/rootStore.context.ts';

const ScriptsListPage = observer(() => {
    //react hooks
    const navigate = useNavigate();

    //ref
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    //stores
    const rootStore = useContext(RootStoreContext);

    const tableRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - 32 - node.offsetTop + 'px';
        }
    }, []);

    //**************************************************************************************************
    //effects

    useEffect(() => {
        rootStore?.scriptsList.get();
    }, []);

    useEffect(() => {
        if (tableWrapperRef.current === null) return;
        const tableWrapper: HTMLDivElement = tableWrapperRef.current;
        tableWrapper.style.height = window.innerHeight - 16 - tableWrapper.offsetTop - 16 + 'px';
    }, []);

    //**************************************************************************************************
    //handlers

    // const handleBtnAdd = (): void => {
    //     navigate('/scripts/add');
    // };
    //
    // const handleBtnEdit = (scriptID: number): void => {
    //     navigate('/scripts/' + String(scriptID));
    // };

    // const handleBtnCopy = async (indexRow: number): Promise<void> => {
    //     const scriptText = scriptListStore.value[indexRow]['script_text'];
    //     scriptCardStore.updStoreValue('script_name', `${scriptListStore.value[indexRow]['script_name']} (копия)`);
    //     scriptCardStore.updStoreValue('script_comment', scriptListStore.value[indexRow]['script_comment']);
    //     scriptCardStore.updStoreValue('script_text', scriptText);
    //     await scriptCardStore.addItem();
    //     scriptListStore.getList();
    // };

    // const handleBtnDel = (itemID: string, itemName: string): void => {
    //     setModalSelectedItem({ itemID, itemName });
    //     setModalOpen(true);
    // };
    //
    // const handleDelItem = async (): Promise<void> => {
    //     if (modalSelectedItem.itemID) {
    //         await scriptListStore.delItem(modalSelectedItem.itemID);
    //     }
    //     scriptListStore.resetValue();
    //     scriptListStore.getList();
    // };

    //**************************************************************************************************
    //render

    return (
        <div className={'h-full p-4'}>
            <div className={'top-panel'}>
                <p className={'title'}>Список скриптов</p>
                <button className={'btn active:bg-color-main'} disabled={rootStore?.dictsList.state === 'pending'}>
                    Добавить
                </button>
            </div>
            <AppLoadingOverlay ref={tableWrapperRef} active={rootStore?.scriptsList.state === 'pending'}>
                <ScriptsList data={rootStore?.scriptsList.data} />
            </AppLoadingOverlay>
        </div>
    );
});

export default ScriptsListPage;
