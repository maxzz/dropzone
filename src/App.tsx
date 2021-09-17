import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';

function App() {
    return (
        <React.Fragment>
            {/* <div className="p-4 grid grid-rows-[auto,1fr] h-screen"> */}
            <div className="p-4 flex flex-col h-screen">
                <Header />
                <div className="flex-1 mt-4 -mr-2 max-h-full overflow-y-hidden mb-8">
                {/* <div className="flex-1 mt-4 -mr-2 max-h-full mb-8"> */}
                {/* <div className="flex-1 mt-4 -mr-2 max-h-full overflow-y-auto mb-8"> */}
                {/* <div className="flex-1 mt-4 -mr-2 max-h-full overflow-y-hidden"> */}
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
