import { atom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { filesAtom, FileUs, FileUsAtom, updateCacheAtom } from '../store/store';
import uuid from '../utils/uuid';

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

export function DropzoneComp() {
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
