import { FC } from 'react';

//types
import type { Column } from '@table-library/react-table-library/compact';
import type { TUploadRecord } from 'src/entities/record/types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';
import AppPopUpMenu, { AppPopUpBtnDel } from 'src/shared/ui/AppPopUpMenu';
import classNames from 'classnames';

interface IProps {
    data?: TUploadRecord[] | null;
    handleMenuUpload: (itemID: number) => void;
    handleMenuDel: (itemID: number) => void;
}

const TableUploadRecordsList: FC<IProps> = ({ data, handleMenuUpload, handleMenuDel }) => {
    const columns: Column<TUploadRecord>[] = [
        {
            label: 'Имя файла',
            renderCell: (item) => item.file_name,
            resize: true
        },
        {
            label: 'Длительность',
            renderCell: (item) => (
                <div className={'flex items-center justify-between gap-2'}>
                    <div className={'ellipsis'}>{item.file_length}</div>
                    <div className={'shrink-0 flex items-center gap-2'}>
                        {item.state === 'loading' && <div className={'i-svg-spinners:3-dots-fade c-color-second'} />}
                        {item.state === 'done' && <div className={'i-ri:check-fill c-color-green'} />}
                        {item.state === 'error' && <div className={'i-ri:error-warning-fill c-red'} />}
                        <AppPopUpMenu
                            items={[
                                {
                                    elem: (
                                        <div
                                            className={classNames('pop-up-menu__item', {
                                                'cursor-default hover:bg-transparent': item.state === 'done'
                                            })}>
                                            <div className={'i-ri:upload-cloud-2-fill c-color-second'} />
                                            <p
                                                className={classNames('c-color-main', {
                                                    'c-color-second': item.state === 'done'
                                                })}>
                                                Отправить
                                            </p>
                                        </div>
                                    ),
                                    onClick: item.state !== 'done' ? () => handleMenuUpload(item.id) : undefined
                                },
                                {
                                    elem: <AppPopUpBtnDel />,
                                    onClick: () => handleMenuDel(item.id)
                                }
                            ]}
                        />
                    </div>
                </div>
            )
        }
    ];

    return <AppTable name={'UploadRecordsList'} data={{ nodes: data ?? [] }} columns={columns} />;
};

export default TableUploadRecordsList;
