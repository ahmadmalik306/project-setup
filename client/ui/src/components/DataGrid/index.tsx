/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Button, Pagination } from '@mui/material';
import { StyledContainer } from './styles';

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
            if (event.target.value === `All ${rest?.field}`) {
                setColumnFilters((prevFilters) => {
                    const { [rest?.field]: excludedValue, ...newFilters } =
                        prevFilters;
                    return newFilters;
                });
                setValue(event.target.value);
            } else {
                setValue(event.target.value);
                let newObj = {};
                if (columnFilters && Object.keys(columnFilters).length) {
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
                    setColumnFilters(newObj);
                } else {
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
    isLoading = false,
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
        }
    }, [tableRows]);

    const CustomPagination = (props) => {
        const handleLastPageClick = () => {
            const lastPage = Math.ceil(rowCount / paginationModel.pageSize);
            props.onChange(null, lastPage);
        };
        return (
            <>
                <Button
                    onClick={() => {
                        setPaginationModel({
                            page: 1,
                            pageSize: paginationModel.pageSize
                        });
                        props.onChange(null, 1);
                    }}
                >
                    First
                </Button>
                <Pagination
                    variant='outlined'
                    shape='rounded'
                    page={props.page}
                    count={props.count}
                    onChange={props.onChange}
                />
                <Button onClick={handleLastPageClick}>Last</Button>
            </>
        );
    };

    const handlePaginationChange = (event, value) => {
        setPaginationModel((prev) => ({
            ...prev,
            page: value
        }));

        // Calculate the start index of the new page
        const startIndex = (value - 1) * paginationModel.pageSize;

        // Slice the tableRows array to get the rows for the current page
        const newRows = tableRows.slice(
            startIndex,
            startIndex + paginationModel.pageSize
        );
        setRows(newRows);
    };

    return (
        <StyledContainer>
            <DataGridPro
                {...(toolbarActionsMode === 'server' && {
                    rowCount: rowCount,
                    loading: isLoading,
                    // paginationModel: paginationModel,
                    // onPaginationModelChange: setPaginationModel,
                    onSortModelChange: handleSortModelChange
                })}
                initialState={{
                    pagination: {
                        paginationModel:
                            toolbarActionsMode === 'server'
                                ? paginationModel
                                : {
                                      ...paginationModel,
                                      page: paginationModel?.page - 1
                                  } // client
                    }
                }}
                rows={rows}
                columns={columnData}
                pagination
                paginationMode={toolbarActionsMode}
                sortingMode={toolbarActionsMode}
                pageSizeOptions={[5, 10, 25]}
                slots={{
                    pagination: CustomPagination
                }}
                slotProps={{
                    pagination: {
                        page: paginationModel?.page,
                        count: Math.ceil(rowCount / paginationModel?.pageSize),
                        onChange: handlePaginationChange
                    }
                }}
                disableColumnFilter
                disableColumnMenu
            />
        </StyledContainer>
    );
};
