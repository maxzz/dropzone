import { CSSProperties, HTMLAttributes, useCallback } from "react";
import { useSetAtom } from "jotai";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { nameLengthValidator } from "./2-files-validator";
import { doSetFilesAtom } from "@/store";

type DropzoneRootProps = HTMLAttributes<HTMLDivElement> & {
    classNameActive?: string;
    stylesActive?: CSSProperties;
};

export function DropzoneRoot({ className, style = {}, classNameActive, stylesActive = {}, children }: DropzoneRootProps) {
    const setFiles = useSetAtom(doSetFilesAtom);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[], event: DropEvent) => {
            setFiles(acceptedFiles);

            rejectedFiles.forEach(
                ({ file, errors }) => {
                    toast(`The file "${file.name}" was skipped. ${errors.map((err) => err.message).join(' + ')}`, { style: { backgroundColor: '#f19700' } });
                }
            );
        }, []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        validator: nameLengthValidator,
    });

    return (
        <div {...getRootProps()} className={`${className} ${isDragActive ? classNameActive : ''}`} style={isDragActive ? { ...stylesActive } : style}>
            <input {...getInputProps()} />
            {children}
        </div>
    );
}
