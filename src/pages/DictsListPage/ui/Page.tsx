import { useContext, useEffect, MouseEvent, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

//components
import AppLoadingOverlay from 'src/shared/ui/AppLoadingOverlay';
import AppDock from 'src/shared/ui/AppDock';
import { DictsList, DictCard } from '../../../entities/script';

//stores
import RootStoreContext from 'src/app/providers/rootStore.context.ts';
import { DictCardStore } from 'src/entities/script';

const DictsListPage = observer(() => {
    //ref
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    //stores
    const rootStore = useContext(RootStoreContext)!;
    const [dictStore] = useState(() => new DictCardStore(rootStore));

    //states
    const [showDictCard, setShowDictCard] = useState<boolean>(false);
    const [disabledBtnSave, setDisabledBtnSave] = useState<boolean>(true);

    //**************************************************************************************************
    //effects

    useEffect(() => {
        if (tableWrapperRef.current === null) return;
        const tableWrapper: HTMLDivElement = tableWrapperRef.current;
        tableWrapper.style.height = window.innerHeight - 16 - tableWrapper.offsetTop - 16 + 'px';
    }, []);

    useEffect(() => {
        if (!dictStore.data) return;
        if (!dictStore.data.attributes.name) {
            setDisabledBtnSave(true);
            return;
        }
        setDisabledBtnSave(!dictStore.changed);
    }, [dictStore.changed, dictStore.data?.attributes.name]);

    //**************************************************************************************************
    //agentHandlers

    const handleBtnAdd = () => {
        dictStore.createNewDict();
        setShowDictCard(true);
    };

    const handleBtnSave = async () => {
        dictStore.data?.id ? dictStore.upd(dictStore.data.id) : dictStore.add();
        setShowDictCard(false);
        void rootStore.dictsList.getList();
    };

    const handleMenuEdit = (e: MouseEvent, itemID: string) => {
        e.stopPropagation();
        dictStore.createNewDict();
        dictStore.get(itemID);
        setShowDictCard(true);
    };

    const handleMenuDel = async (e: MouseEvent, itemID: string) => {
        e.stopPropagation();
        rootStore.dictsList.del(itemID);
        rootStore.dictsList.getList();
    };

    //**************************************************************************************************
    //render

    return (
        <>
            <div className={'h-full p-4'}>
                <div className={'top-panel'}>
                    <p className={'title'}>Список маркеров</p>
                    <button
                        className={'btn active:bg-color-main'}
                        disabled={rootStore?.dictsList.state === 'pending'}
                        onClick={handleBtnAdd}>
                        Добавить
                    </button>
                </div>
                <AppLoadingOverlay ref={tableWrapperRef} active={rootStore?.dictsList.state === 'pending'}>
                    {rootStore.dictsList.data.length > 0 ? (
                        <DictsList
                            data={rootStore?.dictsList.data}
                            handleMenuEdit={handleMenuEdit}
                            handleMenuDel={handleMenuDel}
                        />
                    ) : (
                        <div className={'h-full flex items-center justify-center'}>Нет сохраненных маркеров</div>
                    )}
                </AppLoadingOverlay>
            </div>
            <AppDock
                onShow={showDictCard}
                setOnShow={setShowDictCard}
                handleBtnSave={handleBtnSave}
                stateBtnSave={disabledBtnSave}>
                <DictCard dictStore={dictStore} onShow={showDictCard} />
            </AppDock>
        </>
    );
});

export default DictsListPage;
