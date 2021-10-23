import React from 'react';
import './App.scss';
import Toaster from './components/UI/UiToaster';
import HeaderBar from './components/Header/HeaderBar';
import FilesList from './components/FilesList';
import RightPanel from './components/RightPanel';
//import UISplitPane from './components/UI/UISplitPane';
import SimpleSplitPane from './components/UI/SimpleSplitPane';
import UISymbolsDefs from './components/UI/UIIconsSymbolsDefs';
import SelectedItems from './components/SelectedItems';

function TestSvgFont() {
    const [ids, setIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        const font = document.querySelector('#svgfont > defs')?.children;
        const ids = (font ? [...font] : []).map(item => item.id);
        setIds(ids);

        console.log({ svgs: ids });
    }, []);
    return (
        <div className="w-[80vw] mx-auto mt-4 flex space-x-2">
            {ids.map((id, idx) =>
                <svg fill="#c3b2d3" stroke="black" strokeWidth={.5} className={`w-8 h-8 border border-gray-500 bg-gray-200 shadow-lg`} key={idx}>
                    <title>{`${id}`}</title>
                    <use xlinkHref={`#${id}`} />
                </svg>
            )}
        </div>
    );
}

function App() {
    return (
        <React.Fragment>
            <Toaster />
            <UISymbolsDefs />
            <TestSvgFont />
            <div className="h-screen p-4 space-y-3 flex flex-col overflow-hidden">
                <HeaderBar className="flex-none" />

                <SelectedItems className="flex-none" />

                <main className="flex-1 relative flex min-w-0 min-h-0">
                    <SimpleSplitPane vertical={false} className="splitpane" minPersent={24}>
                        {/* <UISplitPane split="vertical" defaultSize="50%"> */}
                        {/* minSize={382} */}
                        <FilesList />
                        <RightPanel />
                        {/* </UISplitPane> */}
                    </SimpleSplitPane>
                </main>
            </div>
        </React.Fragment>
    );
}

export default App;

//TODO: limit list width to 382
//TODO: show file size and total files size
//TODO: copy to clipboard filename