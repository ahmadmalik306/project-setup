import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import { COLORS } from '@utils';
import React from 'react';
import { StyledButton } from './styles';

export const CustomToolbar = (props) => {
    const { rowsPerPage, setRowsPerPage } = props;
    // console.log('rowsPerPage: ', rowsPerPage);
    return (
        <>
            <Box
                width={'100%'}
                sx={{
                    backgroundColor: COLORS.gray
                }}
            >
                <Grid
                    container
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    padding={0.5}
                >
                    <Grid item>
                        <Grid container spacing={0.7}>
                            <Grid item>
                                <StyledButton variant='contained'>
                                    New
                                </StyledButton>
                            </Grid>
                            <Grid item>
                                <StyledButton variant='contained' disabled>
                                    Edit
                                </StyledButton>
                            </Grid>
                            <Grid item>
                                <StyledButton variant='contained' disabled>
                                    Delete
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems={'center'} spacing={4}>
                            <Grid item display={'flex'} alignItems={'center'}>
                                <Typography>Show</Typography>
                                <Select
                                    size='small'
                                    value={rowsPerPage}
                                    sx={{
                                        mx: 0.5,
                                        backgroundColor: COLORS.green,
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                    onChange={(e) => {
                                        setRowsPerPage(e.target.value);
                                    }}
                                >
                                    <MenuItem value={5}>{5}</MenuItem>
                                    <MenuItem value={10}>{10}</MenuItem>
                                    <MenuItem value={25}>{25}</MenuItem>
                                </Select>
                                <Typography>entries</Typography>
                            </Grid>
                            <Grid item>search</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
        </>
    );
};
