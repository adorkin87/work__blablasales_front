import { FC, MouseEvent, useState } from 'react';

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
    handleMenuEdit: (e: MouseEvent, itemID: string) => void;
    handleMenuDel: (e: MouseEvent, itemID: string) => Promise<void>;
}

const ScriptsList: FC<ITableRecordsList> = ({ data, included, handleMenuEdit, handleMenuDel }) => {
    const [ids, setIds] = useState<string[]>([]);

    const getNameDict = (dictsList: { id: string }[], included: Required<TDict>[]): string[] => {
        const ids = dictsList.map((dict) => dict.id);
        const result = included.reduce<string[]>((result, item) => {
            if (ids.includes(item.id)) {
                return [...result, item.attributes.name];
            }
            return result;
        }, []);
        return result;
    };

    const columns: Column<Required<TScript>>[] = [
        {
            label: 'Название',
            renderCell: (item) => (
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-center gap-2'}>
                        <div className={classNames('expand-arrow', { 'expand-arrow_down': ids.includes(item.id) })} />
                        {item.attributes.name}
                    </div>
                    <div className={'flex items-center justify-between gap-2'}>
                        <AppPopUpMenu>
                            <AppPopUpBtnExpand onExpand={ids.includes(item.id)} onClick={() => handleExpand(item)} />
                            <AppPopUpDivider />
                            {/*<div className={'pop-up-menu__item'}>*/}
                            {/*    <div className={'i-ri:file-copy-2-line c-color-second'} />*/}
                            {/*    <p>Копировать</p>*/}
                            {/*</div>*/}
                            <AppPopUpBtnEdit onClick={(e) => handleMenuEdit(e, item.id)} />
                            <AppPopUpBtnDel onClick={(e) => handleMenuDel(e, item.id)} />
                        </AppPopUpMenu>
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

    const handleExpand = (item: TScript) => {
        if (ids.includes(item.id!)) {
            setIds(ids.filter((id) => id !== item.id));
        } else {
            setIds(ids.concat(item.id!));
        }
    };

    const ROW_PROPS = {
        onClick: handleExpand
    };

    const ROW_OPTIONS = {
        renderAfterRow: (item: Required<TScript>) => (
            <>
                {ids.includes(item.id) && (
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
