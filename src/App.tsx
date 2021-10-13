import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import Header from './components/Header';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';
import UISplitPane from './components/UI/UISplitPane';
import SimpleSplitPane from './components/UI/SimpleSplitPane';

// import symbols from "./assets/symbol.defs.svg";
// import Symbols from "./assets/symbol.defs.svg";
// import { ReactComponent as YourSvg } from "./assets/symbol.defs.svg";

function App() {
    return (
        <React.Fragment>

            <div>
                {/* <Symbols /> */}
                {/* <YourSvg /> */}
                {/* <img src={symbols} atl="symbols" /> */}

                <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <symbol id="icon-quill" viewBox="0 0 32 32">
                            <path d="M0 32c4-12 14.469-32 32-32-8.219 6.594-12 22-18 22s-6 0-6 0l-6 10h-2z"></path>
                        </symbol>
                        <symbol id="icon-user" viewBox="0 0 32 32">
                            <path
                                d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z">
                            </path>
                        </symbol>
                        <symbol id="icon-users" viewBox="0 0 32 32">
                            <path
                                d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z">
                            </path>
                            <path
                                d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z">
                            </path>
                        </symbol>
                    </defs>
                </svg>


                <div className="w-16 h-16 text-red-400 fill-current">
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
        </React.Fragment>
    );
}

export default App;

//TODO: limit list width to 382
