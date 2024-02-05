import styled from '@emotion/styled';
import colors from '@colors';
import { Box } from '@mui/system';
import { COLORS } from '@utils';
import { Button } from '@mui/material';
type CellProps = {
    backgroundColor?: string;
};
type GridProps = {
    minHeight?: number;
    maxWidth?: number;
    headerColor?: string;
    isApplicable?: boolean;
    isColumnHeaderCheckbox?: boolean;
    borderRadius?: boolean;
    rowsLength?: number;
};
export const StyledContainer = styled(Box)<GridProps>`
    max-width: unset;
    margin-top: 2rem;
    > .MuiDataGrid-root {
        // max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 950)}px;
        // width: auto;
        // flex: 1;
        // border-radius: 2px;

        .MuiDataGrid-columnSeparator {
            display: none !important;
        }
        .MuiDataGrid-columnHeaders {
            background: ${COLORS.gray};
        }
        .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--sortable.MuiDataGrid-withBorderColor {
            // background: ${COLORS.gray};
            border-right: 0.081rem solid black;
        }
        .MuiDataGrid-row {
            >div: nth-last-of-type(2) {
                border-right: none;
            }
        }
        .MuiDataGrid-row.Mui-selected {
            background-color: black;
        }
        .MuiDataGrid-cell {
            &:focus-within {
                outline: 0;
            }
            &:editing {
                display: block;
            }
        }
        .selected-row {
            background: blue;
        }
    }
`;

export const StyledButton = styled(Button)(({ theme }) => ({
    color: '#999',
    paddingRight: 0,
    paddingLeft: 0
}));
