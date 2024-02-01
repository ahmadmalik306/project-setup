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
    // const SERVER_OPTIONS = {
    //     useCursorPagination: false
    // };
    const [backendRows, setBackendRows] = useState([]);
    const [rowCount, setRowCount] = useState(1);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 1,
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

    // const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);
    // const { isLoading, rows, pageInfo } = useQuery(paginationModel);
    // const [rowCountState, setRowCountState] = useState(
    //     pageInfo?.totalRowCount || 0
    // );
    const fetchAPI = async () => {
        try {
            const resp = await fetch(
                `https://hbv2-api.nmxglobalsoftware.com/api/hbv2-user/v1/users?page=${paginationModel.page}&perPage=${paginationModel.pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'Application/json',
                        Accept: 'Application/json'
                    }
                }
            );
            return resp.json();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchAPI()
            .then((data) => {
                setBackendRows(data?.data);
                setRowCount(data.total);
            })
            .catch((err) => console.log({ err }));
    }, [paginationModel]);

    const { data: clientSidePaginationData } = useDemoData({
        //client side
        dataSet: 'Employee',
        rowLength: 50,
        visibleFields: ['name', 'website', 'phone']
    });
    return {
        dataGrid: (
            <DataGrid
                columns={columns}
                {...(toolbarActionsMode === 'server'
                    ? {
                          tableRows: backendRows,
                          rowCount: rowCount,
                          toolbarActionsMode,
                          paginationModel,
                          setPaginationModel: setPaginationModel,
                          handleSortModelChange
                      }
                    : {
                          tableRows: clientSidePaginationData?.rows,
                          toolbarActionsMode,
                          rowCount: clientSidePaginationData?.rows?.length,
                          paginationModel,
                          setPaginationModel: setPaginationModel
                      })}
            />
        )
    };
};
