import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

function DropzoneComp() {
    const onDrop = useCallback((accepterFiles: File[]) => {
        console.log('files', accepterFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="" {...getRootProps()}>
            <input className="" {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    );
}

function App() {
    return (
        <div className="">
            <header className="">
            </header>
            <DropzoneComp />
        </div>
    );
}

export default App;
