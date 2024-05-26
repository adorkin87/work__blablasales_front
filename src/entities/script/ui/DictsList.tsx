import { FC, useState, MouseEvent } from 'react';
import classNames from 'classnames';

//types
import type { Column } from '@table-library/react-table-library/compact';
import type { TDict } from '../types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';
import AppPopUpMenu, {
    AppPopUpBtnEdit,
    AppPopUpBtnDel,
    AppPopUpDivider,
    AppPopUpBtnExpand
} from 'src/shared/ui/AppPopUpMenu';

enum Types {
    'kev' = 'КЭВ',
    'marker' = 'Маркер',
    'objection' = 'Возражение'
}

interface IProps {
    data?: TDict[] | null;
    handleMenuEdit: (e: MouseEvent, itemID: string) => void;
    handleMenuDel: (e: MouseEvent, itemID: string) => Promise<void>;
}

const DictList: FC<IProps> = ({ data, handleMenuEdit, handleMenuDel }) => {
    const [idsExpand, setIdsExpand] = useState<string[]>([]);

    //**************************************************************************************************
    //handlers

    const handleExpand = (item: TDict) => {
        if (idsExpand.includes(item.id!)) {
            setIdsExpand(idsExpand.filter((id) => id !== item.id));
        } else {
            setIdsExpand(idsExpand.concat(item.id!));
        }
    };

    //**************************************************************************************************
    //table data

    const columns: Column<Required<TDict>>[] = [
        {
            label: 'Название',
            renderCell: (item) => (
                <div className={'flex items-center gap-2'}>
                    <div className={classNames('expand-arrow', { 'expand-arrow_down': idsExpand.includes(item.id) })} />
                    {item.attributes.name}
                </div>
            ),
            resize: true
        },
        {
            label: 'Тип',
            // renderCell: (item) => Types[item.attributes.type],
            renderCell: (item) => (
                <div className={'flex items-center justify-between gap-2'}>
                    <div className={'ellipsis'}>{Types[item.attributes.type]}</div>
                    <AppPopUpMenu>
                        <AppPopUpBtnExpand onExpand={idsExpand.includes(item.id)} onClick={() => handleExpand(item)} />
                        <AppPopUpDivider />
                        <AppPopUpBtnEdit onClick={(e) => handleMenuEdit(e, item.id)} />
                        <AppPopUpBtnDel onClick={(e) => handleMenuDel(e, item.id)} />
                    </AppPopUpMenu>
                </div>
            )
            // resize: true
        }
        // {
        //     label: 'Комментарий',
        //     renderCell: (item) => (
        //         <div className={'flex items-center justify-between gap-2'}>
        //             <div className={'ellipsis'}>{item.attributes.comment}</div>
        //             <AppPopUpMenu>
        //                 <AppPopUpBtnExpand onExpand={ids.includes(item.id)} onClick={() => handleExpand(item)} />
        //                 <AppPopUpDivider />
        //                 <AppPopUpBtnEdit onClick={(e) => handleMenuEdit(e, item.id)} />
        //                 <AppPopUpBtnDel onClick={(e) => handleMenuDel(e, item.id)} />
        //             </AppPopUpMenu>
        //         </div>
        //     )
        // }
    ];

    const ROW_OPTIONS = {
        renderAfterRow: (item: Required<TDict>) => (
            <>
                {idsExpand.includes(item.id) && (
                    <tr style={{ gridColumn: '1 / -1', display: 'flex' }}>
                        <td className={'mb-4 px-4 w-full'}>
                            <p>
                                <span className={'fw-600 text-sm'}>триггеры:</span>{' '}
                                {item.attributes.triggers?.map((trigger) => trigger).join(', ')}
                            </p>
                            {/*<p className={'fw-600 text-sm'}>используется:</p>*/}
                        </td>
                    </tr>
                )}
            </>
        )
    };

    const ROW_PROPS = {
        onClick: handleExpand
    };

    //**************************************************************************************************
    //render

    return (
        <AppTable
            // name={'DictList'}
            data={{ nodes: data ?? [] }}
            columns={columns}
            rowProps={ROW_PROPS}
            rowOptions={ROW_OPTIONS}
        />
    );
};

export default DictList;
