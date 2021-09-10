import React, { useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { useUpdateAtom } from "jotai/utils";
import { useDropzone } from 'react-dropzone';
import './App.css';
import { filesAtom, FileUs, FileUsAtom, updateCacheAtom } from './store/store';
import uuid from './utils/uuid';
import { IconAppLogo, IconAutoMode, IconManualMode } from './components/Icons';

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
        <div {...getRootProps()} className="px-4 py-3 bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md">
            <input {...getInputProps()} className="" />
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
        <div className="min-h-screen flex flex-col justify-between bg-green-900 text-green-100">
            <header className="p-4 grid grid-cols-[1fr,auto] gap-x-2 items-center">
                <div className="">
                    <DropzoneComp />
                </div>
                <div className="w-6 h-6 text-green-500">
                    <IconAppLogo />
                </div>
            </header>

            <div className="flex-1 mt-4 mx-4">
                <GridFiles />
            </div>
        </div>
    );
}

export default App;
