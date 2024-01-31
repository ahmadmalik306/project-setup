import React, { useEffect, useState } from 'react';
import { DataGrid } from '../components';
import { createFakeServer, useDemoData } from '@mui/x-data-grid-generator';

export const useDataTable = ({
    directoryConfig: {
        config: {
            columns,
            toolbarActionsMode = 'client',
            multiSort = false,
            pagination = true
        }
    }
}) => {
    const SERVER_OPTIONS = {
        useCursorPagination: false
    };
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5
    });

    const [fetchOptions, setFetchOptions] = React.useState({
        sort: []
    });

    useEffect(() => {
        setFetchOptions(
            pagination
                ? { ...fetchOptions, ...paginationModel }
                : { ...fetchOptions }
        );
    }, [pagination]);

    const handleSortModelChange = (sortModel) => {
        setFetchOptions({
            ...fetchOptions,
            sort: multiSort
                ? [
                      ...fetchOptions?.sort?.filter(
                          ({ field }) => field !== sortModel[0]?.field
                      ),
                      ...sortModel
                  ]
                : sortModel
        });
    };

    const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);
    const { isLoading, rows, pageInfo } = useQuery(paginationModel);
    const [rowCountState, setRowCountState] = useState(
        pageInfo?.totalRowCount || 0
    );

    React.useEffect(() => {
        toolbarActionsMode === 'server' &&
            setRowCountState((prevRowCountState) =>
                pageInfo?.totalRowCount !== undefined
                    ? pageInfo?.totalRowCount
                    : prevRowCountState
            );
    }, [pageInfo?.totalRowCount, setRowCountState]);

    const { data: clientSidePaginationData } = useDemoData({
        //client side
        dataSet: 'Employee',
        rowLength: 100,
        visibleFields: ['name', 'website', 'phone']
    });

    return {
        dataGrid: (
            <DataGrid
                columns={columns}
                {...(toolbarActionsMode === 'server'
                    ? {
                          tableRows: rows,
                          isLoading,
                          rowCount: rowCountState,
                          toolbarActionsMode,
                          paginationModel,
                          setPaginationModel: setPaginationModel,
                          handleSortModelChange
                      }
                    : {
                          tableRows: clientSidePaginationData?.rows,
                          toolbarActionsMode,
                          paginationModel,
                          setPaginationModel: setPaginationModel
                      })}
            />
        )
    };
};
