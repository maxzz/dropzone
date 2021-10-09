import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { busyAtom, clearFilesAtom, setFilesAtom } from '../store/store';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { IconAppLogo, IconDocumentsAccepted, IconMenuHamburger, IconTrash } from './UI/UiIcons';
import toast from 'react-hot-toast';
import TopMenu from './TopMenu';

function fileExt(filename: string = ''): string {
    return /[.]/.exec(filename) ? /([^.]+$)/.exec(filename)?.[0] || '' : '';
}

function nameLengthValidator(file: File) {
    const maxSize = 30000;
    //console.log('drop', file);

    const ext = fileExt(file.name).toLowerCase();
    if (ext !== 'dpm' && ext !== 'dpn') {
        return {
            code: "unknown-type",
            message: `File extension should be '.dpm or .dpn`,
        };
    }

    if (file.size > maxSize) {
        return {
            code: "size-too-big",
            message: `Name is larger than ${maxSize} characters`,
        };
    }

    return null;
}

type DropzoneBaseProps = React.HTMLAttributes<HTMLDivElement> & {
    classNameActive?: string;
    stylesActive?: React.CSSProperties;
};

export function DropzoneBase({ className, classNameActive, stylesActive = {}, children }: DropzoneBaseProps) {
    const setFiles = useUpdateAtom(setFilesAtom);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[], event: DropEvent) => {
        //console.log('dropped', acceptedFiles, rejectedFiles, event);
        setFiles(acceptedFiles);

        if (rejectedFiles.length) {
            rejectedFiles.forEach((file) => {
                toast(`Dropped file "${file.file.name}" as: ${file.errors.map((error) => error.message).join(' + ')}`, { style: { backgroundColor: 'red' } });
            });
        }
    }, []);

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
    const [files, clearFiles] = useAtom(clearFilesAtom);
    const [busy] = useAtom(busyAtom);
    const total = files.length;
    return (
        <div className={`min-h-[40px] flex justify-between bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md`}
        // <div className={`min-h-[40px] flex justify-between ${busy ? 'bg-yellow-900' : 'bg-gray-700'} text-gray-100 ring-2 ring-gray-50 rounded-md`}
        // <div className={`min-h-[40px] flex justify-between bg-gray-700 text-gray-100 ring-2 ${busy ? 'ring-yellow-400' : 'ring-gray-50'} rounded-md`}
        // style={{ transition: 'background-color .5s 1s' }}
        >

            <div className="flex items-center my-0.5">

                <DropzoneBase
                    className={`ml-0.5 rounded-l flex items-stretch ${total ? 'bg-gray-600' : 'bg-gray-900'} cursor-pointer select-none`}
                    stylesActive={{ backgroundColor: '#059669' }} // {/* bg-green-600: classNameActive is not good for tailwind parser */}
                >
                    {total
                        ?
                        <div className="mr-4 my-2 uppercase text-xs flex items-center">
                            <IconDocumentsAccepted className="w-6 h-6 ml-2 mr-1" />
                            {total} file{total === 1 ? '' : 's'}
                        </div>
                        :
                        <div className="px-4 py-2 flex items-center">
                            Drag 'n' drop files here, or click to select files
                        </div>
                    }
                </DropzoneBase>

                {!!total &&
                    <>
                        <div className="px-2 self-stretch border-l rounded-none border-gray-500 bg-gray-600 flex items-center justify-center cursor-pointer">
                            <TopMenu icon={<IconMenuHamburger className="p-1 w-8 h-8 rounded hover:bg-gray-700" />} />
                        </div>

                        <button className="px-2 self-stretch border-l rounded-none border-gray-500 bg-gray-600 flex items-center justify-center">
                            <IconTrash className="w-8 h-8 p-2 rounded hover:bg-red-500 active:scale-[.97]" onClick={() => clearFiles()} />
                        </button>

                        {/* <div className="ml-2">Loading...</div> */}
                        {/* {busy && <div className="ml-2">Loading...</div>} */}
                        {busy && <div className={`ml-2 ${busy ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity .5s 1s' }}>Loading...</div>}
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

//TODO: if we drop a folder then we have a relative path from this folder as a root
/*
(10) [File, File, File, File, File, File, File, File, File, File]
0: File {path: '/DI Admin Test/field_catalog.dpn', name: 'field_catalog.dpn', lastModified: 1585844956000, lastModifiedDate: Thu Apr 02 2020 09:29:16 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', …}
1: File {path: '/DI Admin Test/OLD DNA Lockout/{8a5a0d28-3d14-436c-913d-f638140f3f8c}.dpm', name: '{8a5a0d28-3d14-436c-913d-f638140f3f8c}.dpm', lastModified: 1606161064000, lastModifiedDate: Mon Nov 23 2020 11:51:04 GMT-0800 (Pacific Standard Time), webkitRelativePath: '', …}
2: File {path: '/DI Admin Test/OLD DNA Prod/{c64c064e-e23a-46dd-b3a6-75a9c53f42a9}.dpm', name: '{c64c064e-e23a-46dd-b3a6-75a9c53f42a9}.dpm', lastModified: 1606172264000, lastModifiedDate: Mon Nov 23 2020 14:57:44 GMT-0800 (Pacific Standard Time), webkitRelativePath: '', …}
3: File {path: '/DI Admin Test/OLD DNA Prod/{cfbbce14-f9bf-4a2a-bf23-ee3e92d79dd1}.dpm', name: '{cfbbce14-f9bf-4a2a-bf23-ee3e92d79dd1}.dpm', lastModified: 1606162860000, lastModifiedDate: Mon Nov 23 2020 12:21:00 GMT-0800 (Pacific Standard Time), webkitRelativePath: '', …}
4: File {path: '/DI Admin Test/OLD DNA Prod/{e923da1c-f705-49cc-a678-992599ca331e}.dpm', name: '{e923da1c-f705-49cc-a678-992599ca331e}.dpm', lastModified: 1606082640000, lastModifiedDate: Sun Nov 22 2020 14:04:00 GMT-0800 (Pacific Standard Time), webkitRelativePath: '', …}
5: File {path: '/DI Admin Test/Old DNA Train/{1c685ee7-6f0c-41f6-8ec0-6fcb6e8fefd1}.dpm', name: '{1c685ee7-6f0c-41f6-8ec0-6fcb6e8fefd1}.dpm', lastModified: 1606766152000, lastModifiedDate: Mon Nov 30 2020 11:55:52 GMT-0800 (Pacific Standard Time), webkitRelativePath: '', …}
6: File {path: '/DI Admin Test/Old DNA Train/{d057704e-f02e-4415-8d82-ec002c7bb468}.dpm', name: '{d057704e-f02e-4415-8d82-ec002c7bb468}.dpm', lastModified: 1569526384000, lastModifiedDate: Thu Sep 26 2019 12:33:04 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', …}
7: File {path: '/DI Admin Test/{059dcff8-69f0-4c72-8db4-163a39507fdf}.dpm', name: '{059dcff8-69f0-4c72-8db4-163a39507fdf}.dpm', lastModified: 1585678674000, lastModifiedDate: Tue Mar 31 2020 11:17:54 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', …}
8: File {path: '/DI Admin Test/{25297e6a-27e0-414d-8d98-07b8e02e67ac}.dpm', name: '{25297e6a-27e0-414d-8d98-07b8e02e67ac}.dpm', lastModified: 1585847570000, lastModifiedDate: Thu Apr 02 2020 10:12:50 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', …}
9: File {path: '/DI Admin Test/{bee51e93-e397-416d-912a-04dcacfded72}.dpm', name: '{bee51e93-e397-416d-912a-04dcacfded72}.dpm', lastModified: 1595626694000, lastModifiedDate: Fri Jul 24 2020 14:38:14 GMT-0700 (Pacific Daylight Time), webkitRelativePath: '', …}
*/
