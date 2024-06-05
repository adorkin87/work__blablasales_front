import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import type { TUploadRecord } from 'src/entities/record/types/types.ts';

//src components
import UploadDropZone from 'src/features/UploadDropZone';
import DurationAudio from 'src/features/Records/DurationAudio/DurationAudio.tsx';

//local components
import TableUploadRecordsList from './TableUploadRecordsList.tsx';

//store
import rootStoreContext from 'src/app/providers/rootStore.context.ts';
import RecordUploadListStore from 'src/entities/record/model/recordUploadList.store.ts';
import SelectAgent from 'src/features/SelectAgent';
import SelectScript from 'src/features/SelectScript';

const RecordsUploadPage = observer(() => {
    //react hooks
    const location = useLocation();

    //ref
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    //store
    const rootStore = useContext(rootStoreContext)!;
    const [filesStore] = useState(() => new RecordUploadListStore(rootStore, location.state ? location.state : null));

    //**************************************************************************************************
    //effects

    useEffect(() => {
        if (tableWrapperRef.current === null) return;
        const tableWrapper: HTMLDivElement = tableWrapperRef.current;
        tableWrapper.style.height = window.innerHeight - 16 - 2 - tableWrapper.offsetTop - 32 + 'px';
    }, []);

    //*************************************************************************************************
    //handlers

    const handleMenuUpload = async (itemID: number) => {
        await filesStore.uploadOne(itemID);
    };

    const handleMenuDel = async (itemID: number) => {
        filesStore.del(itemID);
    };

    //*************************************************************************************************
    //table data

    const data = filesStore.files
        ? filesStore.files.reduce<TUploadRecord[]>((result, file, currentIndex) => {
              return [
                  ...result,
                  {
                      id: currentIndex,
                      file_name: file.file.name,
                      file_length: <DurationAudio file={file.file} />,
                      state: file.state
                  }
              ];
          }, [])
        : null;

    // *************************************************************************************************
    // render

    return (
        <UploadDropZone setFiles={(files) => filesStore.add(files)} noClick={true}>
            <div className={'top-panel'}>
                <UploadDropZone setFiles={(files) => filesStore.add(files)} noStyle={true} noDrag={true}>
                    <div className={'btn'}>Добавить</div>
                </UploadDropZone>
                <button
                    className={'btn'}
                    disabled={
                        !filesStore.files ||
                        !filesStore.selectedScript ||
                        !filesStore.files.find((file) => file.state !== 'done')
                    }
                    onClick={() => filesStore.uploadList()}>
                    Отправить
                </button>
            </div>
            {filesStore.files && (
                <div className={'top-panel_filter'}>
                    <div></div>
                    <div className={'flex gap-5'}>
                        <div className={'w-200px'}>
                            <SelectAgent setSelectedAgentID={(newValue) => filesStore.setSelectedAgent(newValue)} />
                        </div>
                        <div className={'w-200px'}>
                            <SelectScript setSelectedScriptID={(newValue) => filesStore.setSelectedScript(newValue)} />
                        </div>
                    </div>
                </div>
            )}
            <div ref={tableWrapperRef} className={classNames({ 'flex-content-center': !filesStore.files })}>
                {filesStore.files ? (
                    <TableUploadRecordsList
                        data={data}
                        handleMenuUpload={handleMenuUpload}
                        handleMenuDel={handleMenuDel}
                    />
                ) : (
                    <div className={'flex flex-col items-center'}>
                        <p>Нажмите добавить</p>
                        <p>или переместите файлы сюда</p>
                    </div>
                )}
            </div>
        </UploadDropZone>
    );
});

export default RecordsUploadPage;
