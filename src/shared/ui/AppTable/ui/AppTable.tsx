import { FC } from 'react';

import { Column, CompactTable, RowOptions, RowPropsAsObject } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';

const theme = useTheme([
    {
        Table: `
                height: auto;
                max-height: 100%;
                color: #373a4d;
            `,
        Header: `
                .th {
                    padding: .5rem;
                    font-weight: 500;
                    font-size: .875rem;
                    background-color: var(--color-white);
                    z-index: 10;
                }
                .resizer-handle {
                    margin: .5rem 0;
                    background-color: var(--color-second);
                }
            `,
        Row: `
                .td {
                    height: 2.25rem;
                    margin-bottom: .5rem;
                    padding: 0 .5rem;
                    display: flex;
                    align-items: center;
                    // font-size: .875rem;
                    cursor: pointer;
                    transition: background-color cubic-bezier(0.4, 0, 0.2, 1) .05s
                }
                .td:first-of-type {
                    border-top-left-radius: .25rem;
                    border-bottom-left-radius: .25rem;
                }
                td:last-of-type {
                    border-top-right-radius: .25rem;
                    border-bottom-right-radius: .25rem;
                }
                &:hover {
                    background-color: rgba(var(--color-main_rgb), .15);
                    // {
                    //     .td .tableActions {
                    //     opacity: 0.8;
                    // }
                }
            `
    }
]);

interface IAppTable {
    name?: string;
    data: { nodes: any[] };
    columns: Column<any>[];
    rowProps?: RowPropsAsObject<any>;
    rowOptions?: RowOptions<any>;
    select?: any;
}

const AppTable: FC<IAppTable> = ({ name, data, columns, rowProps, rowOptions, select }) => {
    const resizedLayout = name ? localStorage.getItem(`confTable_${name}`) : null;

    const handleLayoutChange = (widths: string) => {
        if (!name) return;
        localStorage.setItem(`confTable_${name}`, widths);
    };

    return (
        <CompactTable
            columns={columns}
            data={data}
            theme={theme}
            select={select}
            rowProps={rowProps}
            rowOptions={rowOptions}
            layout={{
                fixedHeader: true,
                resizedLayout: resizedLayout,
                onLayoutChange: handleLayoutChange
            }}
        />
    );
};

export default AppTable;
