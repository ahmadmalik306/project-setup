import React, { useEffect, useState } from 'react';
import { DataGrid } from '../components';
import { createFakeServer, useDemoData } from '@mui/x-data-grid-generator';

export const useDataTable = ({
    directoryConfig: {
        config: { columns, paginationMode = 'client' }
    }
}) => {
    const SERVER_OPTIONS = {
        useCursorPagination: false
    };
    const [paginationModel, setPaginationModel] = React.useState({
        page: 1,
        pageSize: 5
    });
    const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);
    const { isLoading, rows, pageInfo } = useQuery(paginationModel);
    const [rowCountState, setRowCountState] = useState(
        pageInfo?.totalRowCount || 0
    );

    React.useEffect(() => {
        paginationMode === 'server' &&
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
    // console.log('columns: ', columns, clientSidePaginationData);
    console.log(data, rows, rowCountState, paginationModel);
    return {
        dataGrid: (
            <DataGrid
                columns={columns}
                {...(paginationMode === 'server'
                    ? {
                          tableRows: rows,
                          isLoading: isLoading,
                          rowCount: rowCountState,
                          paginationMode: paginationMode,
                          paginationModel: paginationModel,
                          setPaginationModel: setPaginationModel
                      }
                    : {
                          tableRows: clientSidePaginationData?.rows,
                          paginationMode: paginationMode
                      })}
            />
        )
    };
};
