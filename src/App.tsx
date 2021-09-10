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

function GridRow({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);
    return (
        <React.Fragment key={fileUs.id}>
            <div className="">{fileUs.name}</div>
            <div className="">{fileUs.size} bytes</div>
            <div className="">{fileUs.cnt}</div>
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

            <div className="grid grid-cols-[auto,1fr,auto] gap-x-4 text-xs">
                {files.map((atom) =>
                    <GridRow atom={atom} key={`${atom}`} />
                )}
            </div>
        </div>
    );
}

export default App;
