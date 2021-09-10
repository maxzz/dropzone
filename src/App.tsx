import React, { useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { useUpdateAtom } from "jotai/utils";
import { useDropzone } from 'react-dropzone';
import './App.css';
import { filesAtom, FileUs, FileUsAtom, updateCacheAtom } from './store/store';
import uuid from './utils/uuid';

function nameLengthValidator(file: File) {
    const maxLength = 30000;
    if (file.name.length > maxLength) {
        return {
            code: "name-too-large",
            message: `Name is larger than ${maxLength} characters`
        };
    }
    return null;
}

function DropzoneComp() {
    const setFiles = useUpdateAtom(filesAtom);
    const updateCache = useUpdateAtom(updateCacheAtom);

    const onDrop = useCallback((accepterFiles: File[]) => {
        console.log('accepterFiles', accepterFiles);

        const dropped: FileUsAtom[] = accepterFiles.map((file) => {
            return atom<FileUs>({
                id: uuid(),
                name: file.name,
                modified: file.lastModified,
                size: file.size,
                file: file,
            });
        });
        setFiles(dropped);
        updateCache();
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, validator: nameLengthValidator });

    return (
        <div className="w-40 h-40 bg-gray-700 text-gray-100 border border-gray-500 rounded-md" {...getRootProps()}>
            <input className="" {...getInputProps()} />
            <div className="">
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    );
}

function IconManualMode() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="18.1" cy="8.8" r="2" />
            <circle cx="10.9" cy="5.6" r="2" />
            <path d="M1.6 10.1h2.8v9.2H1.6zM4.5 11.4c2.3-.5 3-.2 5.2 1 3.8-.1 6.1.9 6.2 3.7H7.7" />
            <path d="M15.3 14h4a4.2 4.2 0 0 1 3 2c-5.8 5.8-11.8 5.4-17.8 1.8" />
        </svg>
    );
}

function GridRow({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);
    return (
        <React.Fragment key={fileUs.id}>
            <div className="w-4 h-4">
                {fileUs.cnt && <IconManualMode />}
            </div>
            <div className="">{fileUs.name}</div>
            <div className="">{fileUs.size} bytes</div>
            {/* <div className="">{fileUs.cnt}</div> */}
        </React.Fragment>
    );
}

function App() {
    const [files] = useAtom(filesAtom);
    return (
        <div className="min-h-screen flex-col bg-green-200">
            <header className="">
                Drop files
            </header>

            <div className="flex-1 flex items-center justify-center bg-green-100">
                <div className="">
                    <DropzoneComp />
                </div>
            </div>

            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4 text-xs">
                {files.map((atom) =>
                    <GridRow atom={atom} key={`${atom}`} />
                )}
            </div>
        </div>
    );
}

export default App;
