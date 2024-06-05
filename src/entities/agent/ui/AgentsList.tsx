import { FC } from 'react';

//types
import type { Column } from '@table-library/react-table-library/compact';
import type { TAgent } from '../types/types.ts';

//components
import AppTable from 'src/shared/ui/AppTable';
import AppPopUpMenu, { AppPopUpBtnDel, AppPopUpBtnEdit } from 'src/shared/ui/AppPopUpMenu';

interface IProps {
    data?: TAgent[] | null;
    handleMenuEdit: (itemID: string) => void;
    handleMenuDel: (itemID: string) => void;
}

const AgentsList: FC<IProps> = ({ data, handleMenuEdit, handleMenuDel }) => {
    const columns: Column<Required<TAgent>>[] = [
        {
            label: 'Имя',
            renderCell: (item) => item.attributes.name,
            resize: true
        },
        {
            label: 'Email',
            renderCell: (item) => item.attributes.email,
            resize: true
        },
        {
            label: 'Телефон',
            // renderCell: (item) => item.attributes.phone,
            renderCell: (item) => (
                <div className={'flex items-center justify-between gap-2'}>
                    <div className={'ellipsis'}>{item.attributes.phone}</div>
                    <AppPopUpMenu
                        items={[
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
            )
            // resize: true
        }
        // {
        //     label: 'Комментарий',
        //     renderCell: (item) => (
        //         <div className={'flex items-center justify-between gap-2'}>
        //             <div className={'ellipsis'}>{item.attributes.comment}</div>
        //             <div
        //                 className={'h-6 px-1 flex items-center justify-center group'}
        //                 onClick={(e) => handleBtnMore(e, item.id)}>
        //                 <div className={'i-ri-more-2-fill c-color-second/75 group-hover:c-#212227'} />
        //             </div>
        //         </div>
        //     )
        // }
    ];

    return (
        <AppTable
            // name={'AgentsList'}
            data={{ nodes: data ?? [] }}
            columns={columns}
        />
    );
};

export default AgentsList;
