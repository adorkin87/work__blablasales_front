import { FC, useState } from 'react';

//types
import type { Column } from '@table-library/react-table-library/compact';
import type { TScript } from '../types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';
import classNames from 'classnames';

interface ITableRecordsList {
    data?: TScript[] | null;
    rowProps?: { onClick: (item: Required<TScript>) => void };
}

const ScriptsList: FC<ITableRecordsList> = ({ data, rowProps }) => {
    const [ids, setIds] = useState<string[]>([]);

    const columns: Column<Required<TScript>>[] = [
        {
            label: 'Название',
            renderCell: (item) => <div>{item.attributes.name}</div>,
            resize: true
        },
        {
            label: 'Комментарий',
            renderCell: (item) => (
                <div className={classNames('flex items-center justify-between gap-2')}>
                    <div className={'ws-nowrap overflow-hidden text-ellipsis'}>{item.attributes.comment}</div>
                    <div className={'h-6 px-1 flex items-center justify-center group'}>
                        <div className={'i-ri-more-2-fill c-color-second/75 group-hover:c-#212227'} />
                    </div>
                </div>
            )
        }
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
                            <p>КЭВ:{item.attributes.kev?.map((kev) => kev.id).join(', ')}</p>
                            <p>Маркеры: {item.attributes.marker?.map((marker) => marker.id).join(', ')}</p>
                            <p>Возражения: {item.attributes.objection?.map((objection) => objection.id).join(', ')}</p>
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
