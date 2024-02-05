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
        },
        headerLabel = ''
    }
}) => {
    const [backendRows, setBackendRows] = useState([]);
    const [rowCount, setRowCount] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 1,
        pageSize: rowsPerPage
    });

    const [fetchOptions, setFetchOptions] = React.useState({
        sort: []
    });

    useEffect(() => {
        setPaginationModel({
            page: paginationModel.page,
            pageSize: rowsPerPage
        });
    }, [rowsPerPage]);

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
                data && setBackendRows(data?.data);
                data && setRowCount(data.total);
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
                          handleSortModelChange,
                          rowsPerPage,
                          setRowsPerPage,
                          headerLabel
                      }
                    : {
                          tableRows: clientSidePaginationData?.rows,
                          toolbarActionsMode,
                          rowCount: clientSidePaginationData?.rows?.length
                              ? clientSidePaginationData?.rows?.length
                              : undefined,
                          paginationModel,
                          setPaginationModel: setPaginationModel,
                          rowsPerPage,
                          setRowsPerPage,
                          headerLabel
                      })}
            />
        )
    };
};
