import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

//src components
import UploadDropZone from 'src/features/UploadDropZone';
import DurationAudio from 'src/features/Records/DurationAudio/DurationAudio.tsx';

//local components
import TableUploadRecordsList from './TableUploadRecordsList.tsx';
// import useCalculateDurationAudio from 'src/shared/hooks/useCalculateDurationAudio.tsx';

const RecordsUploadPage = () => {
    //react hooks
    const location = useLocation();

    //ref
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    // state
    const [files, setFiles] = useState<File[] | null>(location.state ? location.state : null);
    // const [durationFiles, setDurationFiles] = useState<number[]>([]);

    // files && Promise.all(files.map((file) => useCalculateDurationAudio(file))).then((r) => setDurationFiles(r));

    // *************************************************************************************************
    //effects

    useEffect(() => {
        if (tableWrapperRef.current === null) return;

        const tableWrapper: HTMLDivElement = tableWrapperRef.current;
        tableWrapper.style.height = window.innerHeight - 16 - 2 - tableWrapper.offsetTop - 32 + 'px';
    }, []);

    // *************************************************************************************************
    //agentHandlers

    const handleUploadFiles = (newFiles: File[]) => {
        const uploaded = files ? [...files] : [];
        const upload = [...newFiles];

        upload.some((file: File): void => {
            if (uploaded.findIndex((f: File): boolean => f.name === file.name) === -1) uploaded.push(file);
        });

        setFiles(uploaded);
    };

    // *************************************************************************************************
    // table data

    const data = files
        ? files.reduce((result: TUploadRecord[], file, currentIndex) => {
              return [
                  ...result,
                  {
                      id: currentIndex,
                      file_name: file.name,
                      // file_length: durationFiles[currentIndex] ?? '...'
                      file_length: <DurationAudio file={file} />
                  }
              ];
          }, [])
        : undefined;

    // <PlayAudio file={uploadedFiles[indexAudio]}

    // *************************************************************************************************
    // render

    return (
        <UploadDropZone setFiles={handleUploadFiles} noClick={true}>
            <div className={'top-panel'}>
                <UploadDropZone setFiles={handleUploadFiles} noStyle={true} noDrag={true}>
                    <div className={'btn'}>Добавить</div>
                </UploadDropZone>
                <button className={'btn'} disabled={!files}>
                    Отправить
                </button>
            </div>
            <div ref={tableWrapperRef} className={classNames({ 'flex-content-center': !files })}>
                {files ? (
                    <TableUploadRecordsList data={data} />
                ) : (
                    <div className={'flex flex-col items-center'}>
                        <p>Нажмите добавить</p>
                        <p>или переместите файлы сюда</p>
                    </div>
                )}
            </div>
        </UploadDropZone>
    );
};

export default RecordsUploadPage;
