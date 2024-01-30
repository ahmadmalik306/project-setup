import { createTheme } from '@mui/material';
export const theme = createTheme({
    palette: {
        mode: 'dark'
    },
    components: {
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '30px'
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                root: {
                    pointerEvents: 'none'
                }
            }
        }
    }
});
