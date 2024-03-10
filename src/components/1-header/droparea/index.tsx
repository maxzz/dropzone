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

function ShowingNowCounter() {
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

const dropzoneBg: CSSProperties = {
    backgroundImage: "conic-gradient(at right 0%, #103062b0 214deg, #28446f 264deg, #647897 274deg)",
};

export function Part1_DropzoneArea() {
    const totalFiles = useAtomValue(filesAtom).length;
    const totalFilesText = `${totalFiles} file${plural(totalFiles)}`;
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
                <div className="relative mr-4 my-2 min-w-[6rem] uppercase text-xs flex items-center" title={`Loaded ${totalFilesText}`}>
                    <IconDocumentsAccepted className="w-6 h-6 ml-2 mr-1" />
                    {totalFilesText}
                    <ShowingNowCounter />
                </div>
                :
                <div className="px-4 py-2 flex items-center">
                    Drag &amp; drop files here, or click to select files
                </div>
            }
        </DropzoneBase>
    );
}
