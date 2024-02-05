import { createTheme } from '@mui/material';
import { COLORS } from '@utils';
export const theme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: COLORS.silverGray
        }
    },
    typography: {
        fontFamily: 'Open Sans Condensed, Arial Narrow, Arial, serif'
    },
    components: {
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '30px'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    '.MuiButtonBase-root': {
                        color: '#999'
                    },
                    '.MuiButtonBase-root.Mui-selected': {
                        color: '#fff',
                        backgroundColor: `${COLORS.turquoise} !important`
                    }
                }
            }
        }
    }
});
