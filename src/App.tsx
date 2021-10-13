import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';
import UISplitPane from './components/UI/UISplitPane';
import SimpleSplitPane from './components/UI/SimpleSplitPane';

//import Symbols from "./assets/symbol.defs.svg";
import { ReactComponent as YourSvg } from "./assets/symbol.defs.svg";

function App() {
    return (
        <React.Fragment>
            
            <div>
                {/* <Symbols /> */}
                <YourSvg />
                {/* <img src={Symbols} atl="symbols" /> */}

                <svg>
                    <use xlink:href="#icon-user"></use>
                </svg>
                <span> icon-user </span>
            </div>

            <div className="h-screen p-4 flex flex-col overflow-hidden">
                <Header className="flex-none mb-4" />

                <div className="flex-1 relative flex min-w-0 min-h-0">
                    <SimpleSplitPane vertical={false} className="splitpane" minPersent={24}>
                        {/* <UISplitPane split="vertical" defaultSize="50%"> */}
                        {/* minSize={382} */}
                        <FilesList />
                        <RightPanel />
                        {/* </UISplitPane> */}
                    </SimpleSplitPane>
                </div>

            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;

//TODO: limit list width to 382
