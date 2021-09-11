import React from 'react';
import { useAtom } from 'jotai';
import './App.css';
import { filesAtom, FileUsAtom } from './store/store';
import { IconAppLogo, IconAutoMode, IconManualMode } from './components/Icons';
import toast, { Toaster } from 'react-hot-toast';
import { DropzoneArea } from './components/Dropzone';

function GridRow({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);
    return (
        <React.Fragment key={fileUs.id}>
            <div className="w-4 h-4">
                {fileUs.cnt && <IconManualMode />}
            </div>
            <div className="w-4 h-4">
                {fileUs.cnt && <IconAutoMode />}
            </div>
            <div className="">
                <div className="">{fileUs.name}</div>
                <div className="">{fileUs.name}</div>
                <div className="">{fileUs.size} bytes</div>
            </div>
            {/* <div className="">{fileUs.cnt}</div> */}
        </React.Fragment>
    );
}

function GridFiles() {
    const [files] = useAtom(filesAtom);
    return (
        <div className="p-4 border border-green-700 grid grid-cols-[auto,auto,1fr] items-center gap-x-1 gap-y-2 text-xs">
            {files.map((atom) =>
                <GridRow atom={atom} key={`${atom}`} />
            )}
        </div>
    );
}

function App() {
    return (
        <React.Fragment>
            <div className="min-h-screen flex flex-col justify-between bg-green-900 text-green-100">
                <header className="p-4 grid grid-cols-[1fr,auto] gap-x-2 items-center">
                    <div className="">
                        <DropzoneArea />
                    </div>
                    <div className="w-6 h-6 text-green-500" onClick={() => toast('again')}>
                        <IconAppLogo />
                    </div>
                </header>
                <div className="flex-1 mt-4 mx-4">
                    <GridFiles />
                </div>
            </div>
            <div className="toaser">
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: '',
                        duration: 5000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        // Default options for specific types
                        success: {
                            duration: 3000,
                            theme: {
                                primary: 'green',
                                secondary: 'black',
                            },
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}

export default App;
