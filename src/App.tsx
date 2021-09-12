import React from 'react';
import './App.scss';
import { DropzoneArea } from './components/Dropzone';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';

function App() {
    return (
        <React.Fragment>
            <div className="min-h-screen flex flex-col justify-between">
                <header className="p-4">
                    <DropzoneArea />
                </header>
                <div className="flex-1 mt-4 mx-4">
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
