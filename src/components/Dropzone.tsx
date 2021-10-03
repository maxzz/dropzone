import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { filesAtom, SetFilesAtom } from '../store/store';
import { useDropzone } from 'react-dropzone';
import { IconAppLogo, IconDocumentsAccepted, IconMenuHamburger, IconTrash } from './UI/UiIcons';
import toast from 'react-hot-toast';
import TopMenu from './TopMenu';

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

type DropzoneBaseProps = React.HTMLAttributes<HTMLDivElement> & {
    classNameActive?: string;
    stylesActive?: React.CSSProperties;
};

export function DropzoneBase({ className, classNameActive, stylesActive = {}, children }: DropzoneBaseProps) {
    const setFiles = useUpdateAtom(SetFilesAtom);

    const onDrop = useCallback((accepterFiles: File[]) => setFiles(accepterFiles), []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        validator: nameLengthValidator,
    });

    return (
        <div {...getRootProps()}
            className={`${className} ${isDragActive ? classNameActive : ''}`}
            style={isDragActive ? { ...stylesActive } : {}}
        >
            <input {...getInputProps()} />
            {children}
        </div>
    );
}

export function DropzoneArea({ children }: { children?: React.ReactNode; }) {
    const [files, setFiles] = useAtom(filesAtom);
    return (
        <div className="min-h-[40px] flex justify-between bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md">
            
            <div className="flex my-0.5">
                <DropzoneBase
                    className={`ml-0.5 rounded-l flex items-stretch ${files.length ? 'bg-gray-600' : 'bg-gray-900'} cursor-pointer`}
                    stylesActive={{ backgroundColor: '#059669' }} // {/* bg-green-600: classNameActive is not good for tailwind parser */}
                >
                    {files.length
                        ?
                        <div className="flex items-center">
                            <div className="mr-4 my-2 uppercase text-xs flex items-center">
                                <IconDocumentsAccepted className="w-6 h-6 ml-2 mr-1" />
                                {files.length} file{files.length === 1 ? '' : 's'}
                            </div>
                        </div>
                        :
                        <div className="px-4 py-2">
                            Drag 'n' drop files here, or click to select files
                        </div>
                    }
                </DropzoneBase>
                {!!files.length &&
                    <>
                        <div className="px-2 self-stretch border-l rounded-none border-gray-500 bg-gray-600 flex items-center justify-center cursor-pointer">
                            <TopMenu icon={ <IconMenuHamburger className="p-1 w-8 h-8 rounded hover:bg-gray-700" /> } />
                        </div>
                        <button className="px-2 self-stretch border-l rounded-none border-gray-500 bg-gray-600 flex items-center justify-center">
                            <IconTrash className="w-8 h-8 p-2 rounded hover:bg-red-500 active:scale-[.97]" onClick={(event) => { event.stopPropagation(); setFiles([]); }} />
                        </button>
                    </>
                }
            </div>

            <div className="flex items-center justify-between">
                {children}
                <div className="w-7 h-7 mx-4" onClick={(event) => { event.stopPropagation(); toast('again'); }}>
                    <IconAppLogo />
                </div>
            </div>
        </div>
    );
}
