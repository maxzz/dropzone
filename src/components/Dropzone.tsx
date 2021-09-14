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

export function DropzoneArea({ children }: { children?: React.ReactNode; }) {
    const setFiles = useUpdateAtom(SetFilesAtom);

    const onDrop = useCallback((accepterFiles: File[]) => setFiles(accepterFiles), []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        validator: nameLengthValidator,
    });

    return (
        <div className="flex justify-between bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md">
            <div {...getRootProps()} className="px-4 py-3">
                <input {...getInputProps()} className="" />
                <div className="">
                    {isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop files here, or click to select files</p>
                    }
                </div>
            </div>
            <div className="flex items-center justify-between">
                {children}
                <div className="w-7 h-7" onClick={(event) => { event.stopPropagation(); toast('again'); }}>
                    <IconAppLogo />
                </div>
            </div>
        </div>
    );
}
