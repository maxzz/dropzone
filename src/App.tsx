import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';
import SplitPane from 'react-split-pane';

function App() {
    return (
        <React.Fragment>
            <div className="h-screen p-4 flex flex-col overflow-hidden">
                <Header className="flex-none mb-4" />

                <div className="flex-1 flex min-w-0 min-h-0">
                    <SplitPane className="" split="vertical" minSize={270}>
                        <FilesList className="" />
                        <RightPanel className="" />
                    </SplitPane>
                </div>

                {/* <div className="flex-1 flex min-w-0 min-h-0">
                    <FilesList className="w-1/3 flex-auto flex-shrink-0" />
                    <RightPanel className="ml-4" />
                </div>
 */}
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
