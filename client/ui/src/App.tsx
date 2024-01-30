import React from 'react';
import './App.css';
import { DataGridPro, GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import { Providers } from './providers';
import { Home } from './containers/Home';

function App() {
    return (
        <Providers>
            <Home />
        </Providers>
    );
}

export default App;
