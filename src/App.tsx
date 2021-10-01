import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';
import UISplitPane from './components/UI/UISplitPane';

function App() {
    return (
        <React.Fragment>
            <div className="h-screen p-4 flex flex-col overflow-hidden">
                <Header className="flex-none mb-4" />

                <div className="flex-1 relative flex min-w-0 min-h-0">
                    <UISplitPane className="" split="vertical" minSize={270}>
                        <FilesList className="" />
                        <RightPanel className="" />
                    </UISplitPane>
                </div>

            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
