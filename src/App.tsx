import React from 'react';
import './App.css';
import { IconAppLogo } from './components/Icons';
import { DropzoneArea } from './components/Dropzone';
import toast from 'react-hot-toast';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';

function App() {
    return (
        <React.Fragment>
            <div className="min-h-screen flex flex-col justify-between bg-green-900 text-green-100">
                <header className="p-4 grid grid-cols-[1fr,auto] gap-x-2 items-center">
                    <div className="">
                        <DropzoneArea />
                    </div>
                    <div className="w-6 h-6 text-green-500" onClick={() => toast('again')}>
                        <IconAppLogo />
                    </div>
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
