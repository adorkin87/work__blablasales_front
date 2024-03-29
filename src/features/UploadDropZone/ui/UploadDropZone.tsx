import { FC, ReactNode, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import cls from './UploadDropZone.module.scss';
import classNames from 'classnames';

const baseStyle = {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'transparent',
    borderStyle: 'dashed',
    outline: 'none'
};

const acceptStyle = {
    borderColor: '#76e5a2',
    transition: 'border .24s ease-in-out'
};

const rejectStyle = {
    borderColor: '#A42A33',
    transition: 'border .24s ease-in-out'
};

interface IUploadDropZone {
    children: ReactNode;
    setFiles: (files: File[]) => void;
    noStyle?: true;
    noClick?: boolean;
    noDrag?: true;
}

const UploadDropZone: FC<IUploadDropZone> = ({ children, setFiles, noStyle, noClick = false, noDrag }) => {
    const { getRootProps, acceptedFiles, isDragAccept, isDragReject } = useDropzone({
        noClick,
        noDrag,
        accept: {
            'audio/mpeg': [],
            'audio/wav': [],
            'audio/ogg': []
        }
    });

    const style = noStyle
        ? undefined
        : useMemo(
              () => ({
                  ...baseStyle,
                  ...(isDragAccept ? acceptStyle : {}),
                  ...(isDragReject ? rejectStyle : {})
              }),
              [isDragAccept, isDragReject]
          );

    useEffect(() => {
        if (acceptedFiles.length === 0) return;
        setFiles(acceptedFiles);
    }, [acceptedFiles]);

    return (
        <div className={classNames({ [cls.uploadDropZone]: !noStyle })} {...getRootProps({ style })}>
            {children}
            {(isDragAccept || isDragReject) && <div className={cls.wrapper} />}
        </div>
    );
};

export default UploadDropZone;
