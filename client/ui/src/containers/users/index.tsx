import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import { useDataTable } from '@hooks';

export const Users = () => {
    const columnsClient = [
        //client
        {
            headerName: `Name`,
            field: 'name',
            minWidth: 100,
            headerFilter: true,
            searchable: true,
            renderCell: ({ value, tabIndex }) => (
                <Tooltip title={value} placement='top-end'>
                    <Typography tabIndex={tabIndex}>{value}</Typography>
                </Tooltip>
            ),
            cellClassName: 'remove-border'
        },
        {
            headerName: `Website`,
            field: 'website',
            headerFilter: true,
            minWidth: 100,
            searchable: true,
            renderCell: ({ value, tabIndex }) => (
                <Tooltip title={value} placement='top-end'>
                    <Typography tabIndex={tabIndex}>{value}</Typography>
                </Tooltip>
            )
        },
        {
            headerName: `Phone`,
            field: 'phone',
            headerFilter: false,
            minWidth: 130,
            searchable: true,
            renderCell: ({ value, tabIndex }) => (
                <Tooltip title={value} placement='top-end'>
                    <Typography tabIndex={tabIndex}>{value}</Typography>
                </Tooltip>
            )
        }
    ];
    const columnsServer = [
        //server
        {
            headerName: `Desk`,
            field: 'full_name',
            minWidth: 100,
            headerFilter: true,
            searchable: true,
            renderCell: ({ value, tabIndex }) => (
                <Tooltip title={value} placement='top-end'>
                    <Typography tabIndex={tabIndex}>{value}</Typography>
                </Tooltip>
            ),
            cellClassName: 'remove-border'
        },
        {
            headerName: `Commodity`,
            field: 'description',
            headerFilter: true,
            minWidth: 100,
            searchable: true,
            renderCell: ({ value, tabIndex }) => (
                <Tooltip title={value} placement='top-end'>
                    <Typography tabIndex={tabIndex}>{value}</Typography>
                </Tooltip>
            )
        },
        {
            headerName: `TraderEmail`,
            field: 'email',
            headerFilter: false,
            minWidth: 130,
            searchable: true,
            renderCell: ({ value, tabIndex }) => (
                <Tooltip title={value} placement='top-end'>
                    <Typography tabIndex={tabIndex}>{value}</Typography>
                </Tooltip>
            )
        }
    ];
    const { dataGrid } = useDataTable({
        directoryConfig: {
            config: {
                columns: columnsClient,
                // columns: columnsServer,
                toolbarActionsMode: 'client',
                multiSort: false
            }
        }
    });
    return (
        <div>
            <Typography sx={{ textAlign: 'center' }}>DATAGRID</Typography>
            {dataGrid}
        </div>
    );
};
