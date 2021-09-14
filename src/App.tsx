import React from 'react';
import './App.scss';
import { DropzoneArea } from './components/Dropzone';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';

function App() {
    return (
        <React.Fragment>
            {/* <div className="p-4 grid grid-rows-[auto,1fr] h-screen"> */}
            <div className="p-4 flex flex-col justify-between h-screen">
                <header className="pb-0">
                    <DropzoneArea />
                </header>
                <div className="mt-4 -mr-2 max-h-full overflow-y-hidden">
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
