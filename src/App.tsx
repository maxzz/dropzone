import React, { useCallback, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useUpdateAtom } from "jotai/utils";
import { useDropzone } from 'react-dropzone';
import './App.css';
import { FileCache, filesAtom, FileUs, FileUsAtom } from './store/store';
import uuid from './utils/uuid';

function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`file (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

async function laodCache(acceptedFiles: FileUs[]) {
    const cache: FileCache[] = [];
    for (let file of acceptedFiles) {
        try {
            file.file && cache.push({ id: file.id, cnt: await textFileReader(file.file), });
        } catch (error) {
            console.log('error', error);
        }
    }
    return cache;
}

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
    const [files, setFiles] = useAtom(filesAtom);
    //const setCache = useUpdateAtom(cacheAtom);

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

        // async function createCache() {
        //     setCache(await laodCache(dropped));
        // }
        // createCache();
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
    //const [cache] = useAtom(cacheAtom);
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

            {/* <div className="grid grid-cols-[auto,1fr] gap-x-4 text-xs">
                {files.map((item) => (
                    <React.Fragment key={item.id}>
                        <div className="">{item.name}</div>
                        <div className="">{item.size} bytes</div>
                    </React.Fragment>
                ))}
            </div>
            <div className="">
                {cache.map((item) => (
                    <React.Fragment key={item.id}>
                        <hr className="h-4 bg-[rebeccapurple]" />
                        <pre className="text-xs">
                            {item.id}
                            <br />
                            {item.cnt} bytes</pre>
                    </React.Fragment>
                ))}
            </div>
 */}
        </div>
    );
}

export default App;
