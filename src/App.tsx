import React from 'react';
import './App.scss';
import { DropzoneArea } from './components/Dropzone';
import Toaster from './components/Toaster';
import FilesList from './components/FilesList';
import LabeledSwitch from './components/Switch';

function Button({children, ...rest}: {children?: React.ReactNode, rest?: React.HtmlHTMLAttributes<HTMLElement>}) {
    return (
        <button className="h-8 p-2 flex items-center rounded border shadow-inner"
        style={{
            boxShadow: '#0000005e 1px 1px 4px 0px inset, #bcbcbc99 -1px -1px 2px 0px inset',
            background: '#b0b0b026',
        }}
        >
            {children}
        </button>
    );
}

function App() {
    return (
        <React.Fragment>
            {/* <div className="p-4 grid grid-rows-[auto,1fr] h-screen"> */}
            <div className="p-4 flex flex-col justify-between h-screen">
                <header className="pb-0">
                    <DropzoneArea>
                        <div className="mr-4 flex items-center space-x-2">
                            <Button>Auto</Button>
                            <LabeledSwitch label="Normal" />
                            <LabeledSwitch label="Manual" />
                            <button className="h-8 p-2 flex items-center rounded border shadow-inner"
                            style={{
                                boxShadow: '#0000005e 1px 1px 4px 0px inset, #bcbcbc99 -1px -1px 2px 0px inset',
                                background: '#b0b0b026',
                            }}
                            >Auto</button>
                            <button className="h-8 p-2 flex items-center rounded border">Manual</button>
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
