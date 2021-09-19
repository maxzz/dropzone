import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { filesAtom, SetFilesAtom } from '../store/store';
import { useDropzone } from 'react-dropzone';
import { IconAppLogo } from './UI/UiIcons';
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

export function DropzoneBase({ className, classNameActive, children }: React.HTMLAttributes<HTMLDivElement> & { classNameActive?: string; }) {
    const setFiles = useUpdateAtom(SetFilesAtom);

    const onDrop = useCallback((accepterFiles: File[]) => setFiles(accepterFiles), []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        validator: nameLengthValidator,
    });

    return (
        <div {...getRootProps()} className={`${className} ${isDragActive ? classNameActive : ''}`}>
            <input {...getInputProps()} />
            {children}
        </div>
    );
}

export function DropzoneArea({ children }: { children?: React.ReactNode; }) {
    const [files] = useAtom(filesAtom);
    return (
        <div className="flex justify-between bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md">
            <DropzoneBase className="px-4 py-2 my-0.5 ml-0.5 rounded bg-gray-900 flex items-center" classNameActive="bg-green-600"> {/* TODO: classNameActive is not good fot tailwind parser */}
                {files.length
                    ?
                    <div className="flex items-center">
                        {files.length} file{files.length === 1 ? '': 's'}
                        <div className="ml-4">x</div>
                    </div>
                    :
                    <div>
                        Drag 'n' drop files here, or click to select files
                    </div>
                }
            </DropzoneBase>
            <div className="flex items-center justify-between">
                {children}
                <div className="w-7 h-7 mx-4" onClick={(event) => { event.stopPropagation(); toast('again'); }}>
                    <IconAppLogo />
                </div>
            </div>
        </div>
    );
}
