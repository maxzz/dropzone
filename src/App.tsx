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
                <div className="flex-auto flex min-h-0 overflow-hidden">
                    {/* overflow-y-hidden */}

                    {/* <div className="flex"> */}
                        <FilesList className="flex-auto w-1/3 flex-shrink-0" />
                        {/* <FilesList className="fl1ex-auto w-1/3 flex-shrink-0" /> */}
                        <RightPanel className="ml-4 flex-auto " />
                        {/* <RightPanel className="flex-none w-1/3 bg-red-500" /> */}
                        {/* <button className="bg-yellow-600" onClick={() => setOpen((v) => !v)}>Do</button> */}
                    {/* </div> */}
                    
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
