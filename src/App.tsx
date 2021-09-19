import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';

function App() {
    return (
        <React.Fragment>
            <div className="p-4 grid grid-cols-[minmax(470px,550px),1fr] h-screen">
                <Header className="col-span-full" />
                <div className="w-full h-full flex-auto flex justify-center my-4 overflow-y-hidden">
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
