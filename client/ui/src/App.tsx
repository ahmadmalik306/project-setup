import React from 'react';
import './App.css';
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
