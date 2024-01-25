import React from 'react';
import './App.css';
import { Providers } from './providers';
import { Users } from './containers/users';

function App() {
    return (
        <Providers>
            <Users />
        </Providers>
    );
}

export default App;
