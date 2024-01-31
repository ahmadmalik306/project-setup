/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Button, Pagination } from '@mui/material';

function ApplyFilter(props) {
    const { colDef, setColumnFilters, columnFilters, rows, ...rest } = props;
    const [value, setValue] = React.useState('');
    const menuItems = [`All ${rest?.field}`, ...rows]?.map((row) =>
        typeof row === 'object' ? row[rest.field] : row
    );

    React.useEffect(() => {
        rest?.field && setValue(`All ${rest?.field}`);
    }, []);

    const handleChange = React.useCallback(
        (event) => {
            // console.log(event.target.value, columnFilters);
            if (event.target.value === `All ${rest?.field}`) {
                setColumnFilters({});
                setValue(event.target.value);
            } else {
                setValue(event.target.value);
                let newObj = {};
                if (columnFilters && Object.keys(columnFilters).length) {
                    console.log('if', columnFilters);

                    Object.entries(columnFilters)?.forEach(([key, value]) => {
                        if (key === rest?.field) {
                            newObj[key] = event.target.value;
                        } else {
                            newObj[key] = value;
                        }
                    });
                    if (!Object.keys(columnFilters).includes(rest?.field)) {
                        newObj[rest?.field] = event.target.value;
                    }
                    console.log('ui', newObj, columnFilters);
                    setColumnFilters(newObj);
                } else {
                    console.log('else', columnFilters);
                    setColumnFilters({ [rest?.field]: event.target.value });
                }
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
                defaultValue={value}
                value={value}
                onChange={handleChange}
                label={rest?.field}
            >
                {[...menuItems]?.map((value, index) => {
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
    toolbarActionsMode,
    handleSortModelChange
}) => {
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

    // const CustomPagination = (props) => {
    //     return (
    //         <>
    //             <Button>First</Button>
    //             <Pagination
    //                 variant='outlined'
    //                 shape='rounded'
    //                 page={props.page}
    //                 count={props.count}
    //                 onChange={props.onChange}
    //             />
    //             <Button>Last</Button>
    //         </>
    //     );
    // };

    // const handlePaginationChange = (event, value) => {
    //     setPaginationModel((prev) => ({
    //         ...prev,
    //         page: value
    //     }));
    // };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGridPro
                {...(toolbarActionsMode === 'server' && {
                    rowCount: rowCount,
                    loading: isLoading,
                    paginationModel: paginationModel,
                    onPaginationModelChange: setPaginationModel,
                    onSortModelChange: handleSortModelChange
                })}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 5
                        }
                    }
                }}
                rows={rows}
                columns={columnData}
                pagination
                paginationMode={toolbarActionsMode}
                sortingMode={toolbarActionsMode}
                pageSizeOptions={[5, 10, 25]}
                // slots={{
                //     pagination: CustomPagination
                // }}
                // slotProps={{
                //     pagination: {
                //         page: paginationModel?.page,
                //         count: Math.ceil(
                //             tableRows?.length / paginationModel?.pageSize
                //         ),
                //         onChange: handlePaginationChange
                //     }
                // }}
                disableColumnFilter
            />
        </div>
    );
};
