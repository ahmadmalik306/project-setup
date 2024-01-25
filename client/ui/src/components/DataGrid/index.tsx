/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGridPro } from '@mui/x-data-grid-pro';

function ApplyFilter(props) {
    const { colDef, setColumnFilters, columnFilters, rows, ...rest } = props;

    const [value, setValue] = React.useState(columnFilters?.[rest?.field]);
    const menuItems = rows?.map((row) => row[rest.field]);
    React.useEffect(() => {}, [value]);
    const handleChange = React.useCallback(
        (event) => {
            setValue(event.target.value);
            let newObj = {};
            if (columnFilters) {
                Object.entries(columnFilters)?.forEach(([key, value]) => {
                    if (key === rest?.field) {
                        newObj[key] = event.target.value;
                    } else {
                        newObj[key] = value;
                    }
                });
                setColumnFilters(newObj);
            } else {
                setColumnFilters({ [rest?.field]: event.target.value });
            }
        },
        [columnFilters]
    );

    return (
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} fullWidth>
            <InputLabel id='select-is-admin-label'>{rest?.field}</InputLabel>
            <Select
                labelId='select-is-admin-label'
                id='select-is-admin'
                value={value}
                onChange={handleChange}
                label={rest?.field}
            >
                {menuItems?.map((value, index) => {
                    return (
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

export const DataGrid = ({
    tableRows,
    columns,
    data,
    rowCount,
    isLoading,
    paginationModel,
    setPaginationModel,
    paginationMode
}) => {
    console.log('paginationMode: ', paginationMode, tableRows);
    const [rows, setRows] = React.useState(tableRows);
    const [columnFilters, setColumnFilters] = React.useState();

    const columnData = React.useMemo(
        () =>
            columns.map(({ headerFilter, ...colDef }) => {
                if (headerFilter) {
                    return {
                        ...colDef,
                        width: 200,
                        filterable: true,
                        renderHeader: (params) => (
                            <ApplyFilter
                                {...params}
                                rows={tableRows}
                                setRows={setRows}
                                columnFilters={columnFilters}
                                setColumnFilters={setColumnFilters}
                            />
                        )
                    };
                } else {
                    return { ...colDef };
                }
            }),
        [columns, tableRows, columnFilters]
    );
    React.useEffect(() => {
        if (columnFilters) {
            setRows([
                ...tableRows?.filter((row) => {
                    const result = Object.entries(columnFilters).every(
                        ([key, value]) => row[key] === value
                    );
                    return result;
                })
            ]);
        }
    }, [columnFilters]);
    React.useEffect(() => {
        if (tableRows?.length) {
            setRows(tableRows);
            // let newObj = {};
            // columns?.forEach((column) => {
            //     if (column?.headerFilter) {
            //         newObj[column.field] = tableRows?.[0]?.[column?.field];
            //     }
            // });
            // setColumnFilters(newObj);
        }
    }, [tableRows]);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGridPro
                /////////////////client below//////////////////////
                // rows={rows}
                // columns={columnData}

                // pagination
                pageSizeOptions={[5, 10, 25]}
                /////////////////////////server below///////////////////////////////
                {...(paginationMode === 'server' && {
                    rowCount: rowCount,
                    loading: isLoading
                })}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 1,
                            pageSize: 10
                        }
                    }
                }}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rows={rows}
                columns={columnData}
                pagination
                paginationMode={paginationMode}
                // pageSizeOptions={[5, 10, 25]}
                disableColumnFilter
            />
        </div>
    );
};
