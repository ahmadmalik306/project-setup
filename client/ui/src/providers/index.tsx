import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../assets';
type Props = {
    children: React.ReactNode;
};
export const Providers: React.FC<Props> = ({ children }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);
