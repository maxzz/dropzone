import React from 'react';
import './App.scss';
import { DropzoneArea } from './components/Dropzone';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';
import LabeledSwitch from './components/Switch';
import { useAtom } from 'jotai';
import { showManualManiAtom, showNormalManiAtom, totalManualManiAtom, totalNormalManiAtom } from './store/store';

function AppFilters() {
    const [showNormalMani, setShowNormalMani] = useAtom(showNormalManiAtom);
    const [showManualMani, setShowManualMani] = useAtom(showManualManiAtom);

    const [totalNormalMani] = useAtom(totalNormalManiAtom);
    const [totalManualMani] = useAtom(totalManualManiAtom);
    return (<>
        <LabeledSwitch label={
            <div className="flex items-center">
                <div className="inline-block">Normal</div>
                <div className="inline-block ml-1 pb-3">{totalNormalMani}</div>
            </div>
        }
            value={showNormalMani} onChange={() => setShowNormalMani(!showNormalMani)} />
        <LabeledSwitch label={`Manual (${totalManualMani})`} value={showManualMani} onChange={() => setShowManualMani(!showManualMani)} />
    </>);
}

function App() {
    return (
        <React.Fragment>
            {/* <div className="p-4 grid grid-rows-[auto,1fr] h-screen"> */}
            <div className="p-4 flex flex-col h-screen">
                <header className="pb-0">
                    <DropzoneArea>
                        <div className="p-2 sm:p-0 flex flex-col sm:flex-row items-end sm:items-center space-x-2 space-y-2 sm:space-y-0 text-sm text-gray-200">
                            <AppFilters />
                        </div>
                    </DropzoneArea>
                </header>
                <div className="flex-1 mt-4 -mr-2 max-h-full overflow-y-hidden">
                    <FilesList />
                </div>
            </div>
            <Toaster />
        </React.Fragment>
    );
}

export default App;
