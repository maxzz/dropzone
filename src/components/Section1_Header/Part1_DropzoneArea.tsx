import React, { CSSProperties, useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { filesAtom, filteredAtom, doSetFilesAtom, } from '@/store';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { IconDocumentsAccepted } from '@ui/icons';
import { classNames, plural } from '@/utils';
import toast from 'react-hot-toast';

function fileExt(filename: string = ''): string {
    return /[.]/.exec(filename) ? /([^.]+$)/.exec(filename)?.[0] || '' : '';
}

function nameLengthValidator(file: File) {
    const maxSize = 200000;
    //console.log('drop', file);

    const ext = fileExt(file.name).toLowerCase();
    if (ext !== 'dpm' && ext !== 'dpn') {
        return {
            code: "unknown-type",
            message: `The file extension must be .dpm or .dpn`,
        };
    }

    if (file.size > maxSize) {
        return {
            code: "size-too-big",
            message: `Name is larger than allowed ${maxSize} bytes.`,
        };
    }

    return null;
}

type DropzoneBaseProps = React.HTMLAttributes<HTMLDivElement> & {
    classNameActive?: string;
    stylesActive?: React.CSSProperties;
};

function DropzoneBase({ className, style = {}, classNameActive, stylesActive = {}, children }: DropzoneBaseProps) {
    const setFiles = useSetAtom(doSetFilesAtom);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[], event: DropEvent) => {
        //console.log('dropped', acceptedFiles, rejectedFiles, event);
        setFiles(acceptedFiles);

        if (rejectedFiles.length) {
            rejectedFiles.forEach((file) => {
                toast(`"${file.file.name}" skipped. ${file.errors.map((error) => error.message).join(' + ')}`, { style: { backgroundColor: '#f19700' } });
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
            style={isDragActive ? { ...stylesActive } : style}
        >
            <input {...getInputProps()} />
            {children}
        </div>
    );
}

const dropzoneBg: CSSProperties = {
    backgroundImage: "conic-gradient(at right 0%, #103062b0 214deg, #28446f 264deg, #647897 274deg)",
};

function CounterShowingNow() {
    const totalFiles = useAtomValue(filesAtom).length;
    const totalFiltered = useAtomValue(filteredAtom).length;
    return (<>
        {totalFiles !== totalFiltered &&
            <div
                className="absolute -right-3 -bottom-1 px-1 text-[.65rem] bg-gray-600 rounded"
                title={`Showing now ${totalFiltered} file${plural(totalFiltered)}`}
            >
                {totalFiltered}
            </div>
        }
    </>);
}

export function Part1_DropzoneArea() {
    const totalFiles = useAtomValue(filesAtom).length;
    const filesText = `${totalFiles} file${plural(totalFiles)}`;
    return (
        <DropzoneBase
            className={classNames(
                "ml-0.5 rounded-l-sm self-stretch flex items-stretch cursor-pointer select-none",
                totalFiles ? "bg-primary-600" : "" // "bg-gradient-to-r from-primary-900 via-indigo-900 to-primary-900 border-r border-primary-500"
            )}
            style={totalFiles ? {} : dropzoneBg}
            stylesActive={{ background: '#059669' }} // {/* bg-green-600: classNameActive is not good for tailwind parser */}
        >
            {totalFiles
                ?
                <div className="relative mr-4 my-2 min-w-[6rem] uppercase text-xs flex items-center" title={`Loaded ${filesText}`}>
                    <IconDocumentsAccepted className="w-6 h-6 ml-2 mr-1" />
                    {filesText}
                    <CounterShowingNow />
                </div>
                :
                <div className="px-4 py-2 flex items-center">
                    Drag &amp; drop files here, or click to select files
                </div>
            }
        </DropzoneBase>
    );
}

//TODO: if we drop a folder then we have a relative path from this folder as a root. Done.
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
