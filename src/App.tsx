import React from 'react';
import './App.scss';
import { DropzoneArea } from './components/Dropzone';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';

function App() {
    return (
        <React.Fragment>
            <div className="p-4 flex flex-col justify-between h-screen overflow-hidden">
                <header className="pb-0">
                    <DropzoneArea />
                </header>
                <div className="flex-1 -mr-2 mt-4 overflow-y-auto smallscroll smallscroll-light">
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
