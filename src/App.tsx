import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';
import UISplitPane from './components/UI/UISplitPane';
import SimpleSplitPane from './components/UI/SimpleSplitPane';
import UISymbolsDefs from './components/UI/UISymbolsDefs';

// import symbols from "./assets/symbol.defs.svg";
// import Symbols from "./assets/symbol.defs.svg";
// import { ReactComponent as YourSvg } from "./assets/symbol.defs.svg";

function App() {
    return (
        <React.Fragment>

            <div className="flex items-center text-xs">
                {/* <Symbols /> */}
                {/* <YourSvg /> */}
                {/* <img src={symbols} atl="symbols" /> */}

                <div className="w-4 h-4 text-red-400 fill-current">
                    <svg className="w-full h-full">
                        <use xlinkHref="#icon-user" />
                    </svg>
                </div>

                {/* <svg> */}
                {/* <use className="w-4 h-4 text-red-400" xlinkHref="#icon-user" /> */}
                {/* <use xlinkHref="#icon-user"></use>
                    <use xlinkHref="#icon-user"></use> */}
                {/* </svg> */}
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
            <UISymbolsDefs />
        </React.Fragment>
    );
}

export default App;

//TODO: limit list width to 382
