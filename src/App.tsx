import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';

function App() {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <div className="h-screen p-4 flex flex-col">
                <Header className="flex-none mb-4" />
                <div className="flex-auto flex overflow-y-hidden">
                    <FilesList className="fl1ex-auto w-1/3" />
                    <RightPanel className="bg-red-500 flex-auto" />
                    <button className="bg-yellow-600" onClick={() => setOpen((v) => !v)}>Do</button>
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
