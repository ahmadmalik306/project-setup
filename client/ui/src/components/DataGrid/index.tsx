/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Button, Grid, Pagination, Typography } from '@mui/material';
import { StyledButton, StyledContainer } from './styles';
import { CustomToolbar } from '@components';
import { COLORS } from '@utils';

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
    handleSortModelChange,
    rowsPerPage,
    setRowsPerPage,
    headerLabel
}) => {
    const [firstRender, setFirstRender] = React.useState(true);
    const [rows, setRows] = React.useState(tableRows);
    const [columnFilters, setColumnFilters] = React.useState();
    const [numberOfPages, setNumberOfPages] = React.useState(
        Math.ceil(rowCount / paginationModel.pageSize)
    );
    console.log({ rows, numberOfPages, columnFilters });

    // React.useEffect(() => {
    //     // toolbarActionsMode === 'client' &&
    //     columnFilters &&
    //         Object.keys(columnFilters).length >= 0 &&
    //         setNumberOfPages(
    //             Math.ceil(
    //                 (toolbarActionsMode === 'client'
    //                     ? rows?.length
    //                     : rowCount) / paginationModel.pageSize
    //             )
    //         );
    //     // if(toolbarActionsMode === 'server'){

    //     // }
    // }, [rows]);

    React.useEffect(() => {
        firstRender &&
            rowCount &&
            paginationModel.pageSize &&
            setNumberOfPages(Math.ceil(rowCount / paginationModel.pageSize));

        if (!firstRender) {
            columnFilters &&
                Object.keys(columnFilters).length >= 0 &&
                setNumberOfPages(
                    toolbarActionsMode === 'client'
                        ? Math.ceil(rows?.length / paginationModel.pageSize)
                        : Math.ceil(
                              (Object.keys(columnFilters).length === 0
                                  ? rowCount
                                  : rows?.length) / paginationModel.pageSize
                          )
                );
        }
        rows?.length && setFirstRender(false);
    }, [rowCount, paginationModel, rows]);

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
                    return { width: 200, ...colDef };
                }
            }),
        [columns, tableRows, columnFilters]
    );

    // React.useEffect(() => {
    //   setPaginationModel({
    //     page: paginationModel.page
    //   })
    // }, [rows])

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
        let showEntries = '';
        console.log({ columnFilters: props.columnFilters });
        if (
            !props.columnFilters ||
            Object.keys(props.columnFilters).length === 0
        ) {
            showEntries = `Showing ${(paginationModel?.page - 1) * paginationModel?.pageSize + 1} to ${Math.min(paginationModel?.page * paginationModel?.pageSize, rowCount)} of ${rowCount} entries`;
        } else {
            showEntries = `Showing ${(paginationModel?.page - 1) * paginationModel?.pageSize + 1} of ${rows?.length} entries (filtered from ${rowCount} total entries)`;
        }
        console.log({ showEntries });
        return (
            <Grid
                container
                justifyContent={'space-between'}
                alignItems={'center'}
                mx={0.5}
            >
                <Grid item>
                    {rowCount && <Typography>{showEntries}</Typography>}
                </Grid>
                <Grid item>
                    <Grid
                        container
                        // justifyContent={'flex-end'}
                        // alignItems={'center'}
                        // mr={0.5}
                    >
                        <Grid item>
                            <StyledButton
                                onClick={() => {
                                    setPaginationModel({
                                        page: 1,
                                        pageSize: paginationModel.pageSize
                                    });
                                    props.onChange(null, 1);
                                }}
                                sx={{
                                    color: '#999'
                                }}
                                disabled={paginationModel.page === 1}
                            >
                                First
                            </StyledButton>
                        </Grid>
                        <Grid item>
                            <StyledButton
                                onClick={() => {
                                    setPaginationModel({
                                        page: paginationModel.page - 1,
                                        pageSize: paginationModel.pageSize
                                    });
                                    props.onChange(
                                        null,
                                        paginationModel.page - 1
                                    );
                                }}
                                sx={{
                                    color: '#999'
                                }}
                                disabled={paginationModel.page === 1}
                            >
                                Previous
                            </StyledButton>
                        </Grid>
                        <Grid item>
                            <Pagination
                                shape='rounded'
                                page={props.page}
                                count={props.count}
                                onChange={props.onChange}
                            />
                        </Grid>
                        <Grid item>
                            <StyledButton
                                sx={{
                                    color: '#999'
                                }}
                                onClick={() => {
                                    setPaginationModel({
                                        page: paginationModel.page + 1,
                                        pageSize: paginationModel.pageSize
                                    });
                                    props.onChange(
                                        null,
                                        paginationModel.page + 1
                                    );
                                }}
                                disabled={
                                    paginationModel.page === numberOfPages
                                }
                            >
                                Next
                            </StyledButton>
                        </Grid>
                        <Grid item>
                            <StyledButton
                                sx={{
                                    color: '#999'
                                }}
                                onClick={() =>
                                    props.onChange(null, props.numberOfPages)
                                }
                                disabled={
                                    paginationModel.page === numberOfPages
                                }
                            >
                                Last
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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
            <Typography
                sx={{
                    paddingY: 1,
                    fontSize: '27px'
                }}
            >
                {headerLabel}
            </Typography>
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
                autoHeight={true}
                paginationMode={toolbarActionsMode}
                sortingMode={toolbarActionsMode}
                pageSizeOptions={[5, 10, 25]}
                slots={{
                    pagination: CustomPagination,
                    toolbar: CustomToolbar
                }}
                slotProps={{
                    pagination: {
                        page: paginationModel?.page,
                        count: numberOfPages,
                        onChange: handlePaginationChange,
                        numberOfPages,
                        columnFilters
                    },
                    toolbar: {
                        rowsPerPage,
                        setRowsPerPage
                    }
                }}
                disableColumnFilter
                disableColumnMenu
            />
        </StyledContainer>
    );
};
