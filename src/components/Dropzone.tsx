import React, { useCallback } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { SetFilesAtom } from '../store/store';
import { useDropzone } from 'react-dropzone';
import { IconAppLogo } from './Icons';
import toast from 'react-hot-toast';

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

export function DropzoneArea() {
    const setFiles = useUpdateAtom(SetFilesAtom);

    const onDrop = useCallback((accepterFiles: File[]) => setFiles(accepterFiles), []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        validator: nameLengthValidator,
    });

    return (
        <div {...getRootProps()} className="px-4 py-3 bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md">
            <input {...getInputProps()} className="" />
            <div className="flex justify-between">
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop files here, or click to select files</p>
                }
                    <div className="w-7 h-7" onClick={(event) => {
                        event.stopPropagation();
                        toast('again');
                    }}>
                        <IconAppLogo />
                    </div>

            </div>
        </div>
    );
}
