import { useAtom } from 'jotai';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import { filesAtom, FileUs } from './store/store';
import uuid from './utils/uuid';

function DropzoneComp() {
    const [files, setFiles] = useAtom(filesAtom);

    const onDrop = useCallback((accepterFiles: File[]) => {
        const dropped: FileUs[] = accepterFiles.map((file) => ({
            id: uuid(),
            name: file.name,
            modified: file.lastModified,
        }));
        setFiles(dropped);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
            <div className="">
                {files.map((item) => <div className="" key={item.id}>{item.name}</div>)}
            </div>
        </div>
    );
}

export default App;
