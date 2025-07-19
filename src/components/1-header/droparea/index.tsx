import { CSSProperties } from "react";
import { useAtomValue } from "jotai";
import { filesAtom, } from "@/store";
import { IconDocumentsAccepted } from "@ui/icons";
import { classNames, plural } from "@/utils";
import { DropzoneRoot } from "./1-root";
import { ShowingNowCounter } from "./3-showing-now-counter";

const dropzoneBgCss: CSSProperties = {
    backgroundImage: "conic-gradient(at right 0%, #103062b0 214deg, #28446f 264deg, #647897 274deg)",
};

export function Part1_DropzoneArea() {
    const totalFiles = useAtomValue(filesAtom).length;
    const totalFilesText = `${totalFiles} file${plural(totalFiles)}`;
    return (
        <DropzoneRoot
            className={classNames("ml-0.5 rounded-l-sm self-stretch flex items-stretch cursor-pointer select-none", totalFiles && "bg-primary-600")}
            style={totalFiles ? {} : dropzoneBgCss}
            stylesActive={{ background: '#059669' }}
        >
            {totalFiles
                ? (
                    <div className="relative mr-4 my-2 min-w-[6rem] uppercase text-xs flex items-center" title={`Loaded ${totalFilesText}`}>
                        <IconDocumentsAccepted className="size-6 ml-2 mr-1" />
                        {totalFilesText}
                        <ShowingNowCounter />
                    </div>
                )
                : (
                    <div className="px-4 py-2 flex items-center">
                        Drag &amp; drop files here, or click to select files
                    </div>
                )
            }
        </DropzoneRoot>
    );
}
