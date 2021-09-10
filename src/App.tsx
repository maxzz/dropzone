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

function IconManualMode0() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="18.1" cy="8.8" r="2" />
            <circle cx="10.9" cy="5.6" r="2" />
            <path d="M1.6 10.1h2.8v9.2H1.6zM4.5 11.4c2.3-.5 3-.2 5.2 1 3.8-.1 6.1.9 6.2 3.7H7.7" />
            <path d="M15.3 14h4a4.2 4.2 0 0 1 3 2c-5.8 5.8-11.8 5.4-17.8 1.8" />
        </svg>
    );
}

function IconManualMode() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".5">
            <path d="M10.3 7c-.4-.2-1 .2-1 .7a1.6 1.6 0 0 0 0 .3c0 1.2.7 2.5.5 3.6-1.5-2-2.2-4.7-3.3-7-2.5-.9.2 4 .6 5 0 .7.8 1 .4 1.8-1-1.7-1.9-4-3.1-5.6C4 5.2 3.3 5 3.2 6c-.3.4 1 2.3 1.3 2.8A12.2 12.2 0 0 0 6 11.6a1.8 1.8 0 0 0 .3.8l-.1.3C5.3 11.9 2.9 7 2 8.2c-.8 1.4 1 2.4 1.5 3.4A25.4 25.4 0 0 1 5 13.8c0 .4-.3.2-.5 0l-.1-.1c-.8-.6-2.8-4.1-3.3-1.9.1 1.6 1.8 2.3 2.5 3.6s0 0 .1 0c1.6 2.1 2.4 4.7 5 3.9 4-1.4 3.1-8.6 1.5-12.3Z" />
            <path d="M13.7 7c.4-.2 1 .2 1 .7a1.6 1.6 0 0 1 0 .3c0 1.2-.7 2.5-.5 3.6 1.5-2 2.2-4.7 3.3-7 2.5-.9-.2 4-.6 5 0 .7-.8 1-.4 1.8 1-1.7 1.9-4 3.1-5.6.4-.6 1.1-.8 1.2.3.3.4-1 2.3-1.3 2.8a12.2 12.2 0 0 1-1.5 2.7 1.8 1.8 0 0 1-.3.8l.1.3c.9-.8 3.3-5.6 4.2-4.5.8 1.4-1 2.4-1.5 3.4a25.4 25.4 0 0 0-1.6 2.2c0 .4.3.2.5 0l.1-.1c.8-.6 2.8-4.1 3.3-1.9-.1 1.6-1.8 2.3-2.5 3.6s0 0-.1 0c-1.6 2.1-2.4 4.7-5 3.9-4-1.4-3.1-8.6-1.5-12.3Z" />
        </svg>
    );
}

function IconAutoMode0() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="m10.8 12.5.3.1a.5.5 0 0 1-.6 0ZM8.3 12.5l.3.1a.5.5 0 0 1-.6 0ZM15.4 12.5h.5c-.2.3-.4.3-.5 0ZM13.5 12.7H13l.1-.2c.1 0 .3 0 .4.2Z" />
            <path d="m2.2 17-.4-.8a6.6 6.6 0 0 1-.3-2.5 3.1 3.1 0 0 1 .8-1.8 3 3 0 0 1 1.5-.7M21.8 17l.4-.8a6.6 6.6 0 0 0 .3-2.5 3.1 3.1 0 0 0-.8-1.8 3 3 0 0 0-1.5-.7" />
            <path d="M4.9 16H3A1 1 0 0 1 2 15a8 8 0 0 1 0-1.4c0-.5.2-.6.7-.7h2.2a1.5 1.5 0 0 1 1.1.3 1.2 1.2 0 0 0 .9.3h10.4a1.2 1.2 0 0 0 .8-.3 1.4 1.4 0 0 1 1-.4h2.4a.6.6 0 0 1 .5.5 3.8 3.8 0 0 1 0 2 1 1 0 0 1-.9.6h-2.5a.8.8 0 0 1-.4-.2 1.8 1.8 0 0 0-1.3-.5H7.2a1.8 1.8 0 0 0-1.3.5 1 1 0 0 1-.5.2Z" />
            <path d="M4.1 13.2A1.2 1.2 0 0 0 3 14.3a1.2 1.2 0 0 0 .3.9 1.2 1.2 0 0 0 .9.3 1.2 1.2 0 0 0 0-2.4ZM20 13.2a1.2 1.2 0 0 0 0 2.3 1.2 1.2 0 0 0 0-2.3ZM6.4 13.9h11.3M6.3 14.3h11.5M6.4 14.7h11.3M6 10.4l-.4-.1.1-.6.6-1.3.2-.6a1.2 1.2 0 0 1 1-.7 16.9 16.9 0 0 1 3.7-.4h.4l3.3.1a10.2 10.2 0 0 1 1.4.2l.6.1a.8.8 0 0 1 .7.6l1 2.3a.3.3 0 0 1 0 .3.3.3 0 0 1-.2 0h-1.9l-3.6-.1h-.2l-5 .1-1.3.1ZM3.7 17.3h-.2a.3.3 0 0 1-.3-.3s0 0 0-.1v-.5H4.9a1.8 1.8 0 0 1 .1.6c0 .2-.2.3-.3.3h-1ZM20.4 17.3h.2a.3.3 0 0 0 .3-.3.2.2 0 0 1 0-.1v-.5l-.5-.1h-.9l-.4.1a1.6 1.6 0 0 0 0 .6c0 .2.1.2.2.2h1Z" />
        </svg>
    );
}

function IconAutoMode() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".8">
            <path d="M11 4.9c1.8 0 4 .2 4.7 3.1 0 .3.1.4.3.5 3.3.5 5 1.1 6.3 6a2.8 2.8 0 0 0 .3.6c.2.3.2.8-.1 1a2.5 2.5 0 0 0-.4.2c-.6.4-.8 1.2-1.4 1.7a2.6 2.6 0 0 1-3.4-.2c-.5-.5-.8-.8-1.3-.8h-5.6c-1.8 0-1.8.4-3.2 1.2-1 .7-2.7.2-3.8-1.3a2.1 2.1 0 0 0-1.8-.9l-.1-.3c-.1-1 .3-.7.6-1.3a4.3 4.3 0 0 0 .2-1.2A9 9 0 0 1 3 11C4.9 7 7.9 4.7 11 5Z" />
            <path d="M10.7 6.4c0 .6-.1 3.3.2 3.1h3.5c.4 0 0-1.8-.2-2-1-1.5-2.3-1.4-3.5-1.1ZM6 13.5c-2.5.2-2.6 4.1 0 4.2 2.7 0 2.7-4 0-4.2ZM21 15.7a2 2 0 1 0-3.9 0 2 2 0 1 0 3.9 0ZM6 9.4h3.6V6.6C8 6.6 6 7.7 6 9.4Z" />
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
            <div className="w-4 h-4">
                {fileUs.cnt && <IconAutoMode />}
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

            <div className="p-4 grid grid-cols-[auto,auto,1fr,auto] items-center gap-x-1 text-xs">
                {files.map((atom) =>
                    <GridRow atom={atom} key={`${atom}`} />
                )}
            </div>
        </div>
    );
}

export default App;
