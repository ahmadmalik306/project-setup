import styled from '@emotion/styled';
import colors from '@colors';
import { Box } from '@mui/system';
import { COLORS } from '@utils';
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
        .MuiDataGrid-row {
            >div: nth-last-of-type(2) {
                border-right: none;
            }
        }
        .MuiDataGrid-detailPanel {
            .MuiDataGrid-row {
                border: 0;
                > div:first-of-type {
                    border-left: 2px solid secondary.main;
                }
                > div:nth-last-of-type(2) {
                    border-right: none;
                }
            }
            .MuiDataGrid-row:last-child {
                &:hover {
                    border-radius: 0 0 25px 25px;
                }
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
