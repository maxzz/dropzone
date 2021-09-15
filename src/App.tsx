import React from 'react';
import './App.scss';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';
import Header from './components/Header';

function App() {
    return (
        <React.Fragment>
            {/* <div className="p-4 grid grid-rows-[auto,1fr] h-screen"> */}
            <div className="p-4 flex flex-col h-screen">
                <Header />
                <div className="flex-1 mt-4 -mr-2 max-h-full overflow-y-hidden">
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
