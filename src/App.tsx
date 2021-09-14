import React from 'react';
import './App.scss';
import { DropzoneArea } from './components/Dropzone';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';
import LabeledSwitch from './components/Switch';
import { useAtom } from 'jotai';
import { showManualManiAtom, showNormalManiAtom } from './store/store';

function AppFilters() {
    const [showNormalMani, setShowNormalMani] = useAtom(showNormalManiAtom);
    const [showManualMani, setShowManualMani] = useAtom(showManualManiAtom);
    return (<>
        <LabeledSwitch label="Normal" value={showNormalMani} onChange={() => setShowNormalMani(!showNormalMani)} />
        <LabeledSwitch label="Manual" value={showManualMani} onChange={() => setShowManualMani(!showManualMani)} />
    </>);
}

function App() {
    return (
        <React.Fragment>
            {/* <div className="p-4 grid grid-rows-[auto,1fr] h-screen"> */}
            <div className="p-4 flex flex-col justify-between h-screen">
                <header className="pb-0">
                    <DropzoneArea>
                        <div className="mr-8 flex flex-col sm:flex-row items-end sm:items-center space-x-2 space-y-2 sm:space-y-0 text-sm text-gray-200">
                            <AppFilters />
                        </div>
                    </DropzoneArea>
                </header>
                <div className="mt-4 -mr-2 max-h-full overflow-y-hidden">
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
