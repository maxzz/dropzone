import React, { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom } from "jotai/utils";
import { useDropzone } from 'react-dropzone';
import './App.css';
import { cacheAtom, FileCache, filesAtom, FileUs } from './store/store';
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
    const setCache = useUpdateAtom(cacheAtom);

    const onDrop = useCallback((accepterFiles: File[]) => {
        console.log('accepterFiles', accepterFiles);

        const dropped: FileUs[] = accepterFiles.map((file) => ({
            id: uuid(),
            name: file.name,
            modified: file.lastModified,
            size: file.size,
            file: file,
        }));
        setFiles(dropped);

        async function createCache() {
            setCache(await laodCache(dropped));
        }
        createCache();
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

function App() {
    const [files] = useAtom(filesAtom);
    const [cache] = useAtom(cacheAtom);
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
                {files.map((item) => <div className="" key={item.id}>{item.name} {item.size} bytes</div>)}
            </div>
            <div className="">
                {cache.map((item) => (
                    <React.Fragment key={item.id}>
                        <hr className="h-4 bg-[rebeccapurple]"/>
                        <pre className="text-xs">
                            {item.id}
                            <br/>
                            {item.cnt} bytes</pre>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default App;
