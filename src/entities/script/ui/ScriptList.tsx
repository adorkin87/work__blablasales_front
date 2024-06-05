import { FC, useState } from 'react';

//types
import type { Column } from '@table-library/react-table-library/compact';
import type { TDict, TScript } from '../types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';
import classNames from 'classnames';
import AppPopUpMenu, {
    AppPopUpBtnDel,
    AppPopUpBtnEdit,
    AppPopUpBtnExpand,
    AppPopUpDivider
} from 'src/shared/ui/AppPopUpMenu';

interface ITableRecordsList {
    data?: TScript[] | null;
    included?: TDict[];
    handleMenuEdit: (itemID: string) => void;
    handleMenuDel: (itemID: string) => void;
}

const ScriptsList: FC<ITableRecordsList> = ({ data, included, handleMenuEdit, handleMenuDel }) => {
    const [idsExpand, setIdsExpand] = useState<string[]>([]);

    const getNameDict = (dictList: { id: string }[], included: Required<TDict>[]): string[] => {
        const ids = dictList.map((dict) => dict.id);
        const result = included.reduce<string[]>((result, item) => {
            if (ids.includes(item.id)) {
                return [...result, item.attributes.name];
            }
            return result;
        }, []);
        return result;
    };

    //**************************************************************************************************
    //handlers

    const handleExpand = (item: TScript) => {
        if (idsExpand.includes(item.id!)) {
            setIdsExpand(idsExpand.filter((id) => id !== item.id));
        } else {
            setIdsExpand(idsExpand.concat(item.id!));
        }
    };

    //**************************************************************************************************
    //table data

    const columns: Column<Required<TScript>>[] = [
        {
            label: 'Название',
            renderCell: (item) => (
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-center gap-2'}>
                        <div
                            className={classNames('expand-arrow', { 'expand-arrow_down': idsExpand.includes(item.id) })}
                        />
                        {item.attributes.name}
                    </div>
                    <div className={'flex items-center justify-between gap-2'}>
                        <AppPopUpMenu
                            items={[
                                {
                                    elem: <AppPopUpBtnExpand onExpand={idsExpand.includes(item.id)} />,
                                    onClick: () => handleExpand(item)
                                },
                                {
                                    elem: <AppPopUpDivider />
                                },
                                {
                                    elem: <AppPopUpBtnEdit />,
                                    onClick: () => handleMenuEdit(item.id)
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
            // resize: true
        }
        // {
        //     label: 'Комментарий',
        //     renderCell: (item) => (
        //         <div className={classNames('flex items-center justify-between gap-2')}>
        //             <div className={'ws-nowrap overflow-hidden text-ellipsis'}>{item.attributes.comment}</div>
        //             <div className={'h-6 px-1 flex items-center justify-center group'}>
        //                 <div className={'i-ri-more-2-fill c-color-second/75 group-hover:c-#212227'} />
        //             </div>
        //         </div>
        //     )
        // }
    ];

    const ROW_PROPS = {
        onClick: handleExpand
    };

    const ROW_OPTIONS = {
        renderAfterRow: (item: Required<TScript>) => (
            <>
                {idsExpand.includes(item.id) && (
                    <tr style={{ gridColumn: '1 / -1', display: 'flex' }}>
                        <td className={'mb-4 px-4 w-full'}>
                            <div>
                                <p>
                                    <span className={'fw-600'}>КЭВ</span>:{' '}
                                    {getNameDict(item.attributes.kev, included as Required<TDict>[]).join(', ')}
                                </p>
                                <p>
                                    <span className={'fw-600'}>Маркеры:</span>{' '}
                                    {getNameDict(item.attributes.marker, included as Required<TDict>[]).join(', ')}
                                </p>
                                <p>
                                    <span className={'fw-600'}>Возражения:</span>{' '}
                                    {getNameDict(item.attributes.objection, included as Required<TDict>[]).join(', ')}
                                </p>
                            </div>
                        </td>
                    </tr>
                )}
            </>
        )
    };

    //**************************************************************************************************
    //render

    return (
        <AppTable
            // name={'ScriptsList'}
            data={{ nodes: data ?? [] }}
            columns={columns}
            rowProps={ROW_PROPS}
            rowOptions={ROW_OPTIONS}
        />
    );
};

export default ScriptsList;
