import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';

function App() {
    return (
        <React.Fragment>
            <div className="h-screen p-4 grid grid-rows-[auto,1fr] grid-cols-[minmax(450px,550px),1fr] gap-y-4 sm:gap-4">
                <Header className="col-span-full" />
                <div className="w-full h-full flex-auto overflow-y-hidden"
                    style={{
                        transition: 'transform .2s ease',
                        transform: 'scaleX(.0001)',
                        transformOrigin: 'left top',
                    }}
                >
                    <FilesList />
                </div>
                <RightPanel className="bg-red-500" />
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
