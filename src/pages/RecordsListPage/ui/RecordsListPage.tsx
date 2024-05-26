import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

//src components
import UploadDropZone from 'src/features/UploadDropZone';
import SelectManagers from 'src/features/SelectManagers';
import SelectCntRowTable from 'src/features/SelectCntRowTable';
import AppPagination from 'src/shared/ui/AppPagination';
import AppLoadingOverlay from 'src/shared/ui/AppLoadingOverlay';

//local components
import RecordList from '../../../entities/record/ui/RecordList.tsx';

//stores
import rootStoreContext from 'src/app/providers/rootStore.context.ts';

const RecordsListPage = observer(() => {
    //react hooks
    const navigate = useNavigate();

    //stores
    const rootStore = useContext(rootStoreContext);

    //ref
    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const paginationRef = useRef<HTMLDivElement>(null);

    //states
    const [selectedManager, setSelectedManager] = useState<number>(0);
    const [navCurrent, setNavCurrent] = useState(1);

    const [files, setFiles] = useState<File[] | null>(null);

    //variables
    const showPagination =
        !!rootStore?.recordsList.meta?.count && rootStore.viewer.conf.cntRowTable.value
            ? rootStore.recordsList.meta.count > rootStore.viewer.conf.cntRowTable.value
            : false;

    // *************************************************************************************************
    //effects

    useEffect(() => {
        rootStore?.recordsList.getList({
            'page[offset]': navCurrent,
            'page[limit]': rootStore.viewer.conf.cntRowTable.value
        });
    }, [navCurrent]);

    useEffect(() => {
        refreshData();
    }, [rootStore?.viewer.conf.cntRowTable.value]);

    useEffect(() => {
        if (tableWrapperRef.current === null) return;
        const tableWrapper: HTMLDivElement = tableWrapperRef.current;

        if (showPagination) {
            if (paginationRef.current === null) return;
            const pagination = paginationRef.current;
            const paginationHeight = pagination.offsetHeight;
            const paginationMargin = parseInt(getComputedStyle(pagination).marginTop);
            tableWrapper.style.height =
                window.innerHeight - 16 - 2 - tableWrapper.offsetTop - paginationMargin - paginationHeight - 16 + 'px';
        } else {
            tableWrapper.style.height = window.innerHeight - 16 - 2 - tableWrapper.offsetTop - 32 + 'px';
        }
    }, [showPagination, rootStore!.viewer.conf.cntRowTable.value]);

    useEffect(() => {
        if (!files) return;
        navigate('/records/upload', { state: files });
    }, [files]);

    // *************************************************************************************************
    //agentHandlers

    const handleBtnAdd = (): void => {
        navigate('/records/upload');
    };

    const refreshData = () => {
        setNavCurrent(1);
        rootStore?.recordsList.getList({ 'page[offset]': 1, 'page[limit]': rootStore.viewer.conf.cntRowTable.value });
    };

    // *************************************************************************************************
    // render

    return (
        <UploadDropZone setFiles={setFiles} noClick={true}>
            <div className={'top-panel'}>
                <p className={'title'}>Загруженные записи</p>
                <div className={'flex items-center gap-5'}>
                    <button
                        className={'btn px-10px '}
                        disabled={rootStore?.agentsList.state === 'pending'}
                        onClick={refreshData}>
                        <div className={'i-ri-refresh-line text-4'} />
                    </button>
                    <button className={'btn'} onClick={handleBtnAdd}>
                        Загрузить
                    </button>
                </div>
            </div>

            <div className={'top-panel_filter'}>
                <div></div>
                <div className={'flex gap-5'}>
                    <div className={'w-200px'}>
                        <SelectManagers selectedManager={selectedManager} setSelectedManager={setSelectedManager} />
                    </div>
                    <div className={'w-200px'}>
                        <SelectCntRowTable />
                    </div>
                </div>
            </div>

            <AppLoadingOverlay ref={tableWrapperRef} active={rootStore?.recordsList.state === 'pending'}>
                <RecordList data={rootStore?.recordsList.data} included={rootStore?.recordsList.included!} />
            </AppLoadingOverlay>

            {showPagination && (
                <div ref={paginationRef} className={'pb-4 mt-4'}>
                    <AppPagination
                        curPage={navCurrent}
                        total={rootStore?.recordsList.meta?.count!}
                        setPage={setNavCurrent}
                        perPage={rootStore!.viewer.conf.cntRowTable.value}
                        isLoading={rootStore?.recordsList.state === 'pending'}
                    />
                </div>
            )}
        </UploadDropZone>
    );
});

export default RecordsListPage;
