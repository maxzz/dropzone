import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { FileUsAtomType, rightPanelAtoms, ViewMode } from "@/store";
import { SymbolOpenLink, SymbolPen } from "@ui/icons";

const itemClasses = "p-1 size-8 hover:bg-primary-700 rounded active:scale-[.97] flex items-center justify-center outline-none focus:ring-1 ring-primary-400";

export function ButtonCardEdit({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: number; }) {
    //const setFormEditorData = useSetAtom(formEditorDataAtom);
    const setViewMode = useSetAtom(rightPanelAtoms.viewModeAtom);
    return (
        <button
            className={itemClasses}
            title="Switch to manifest editing mode"
            //onClick={() => setFormEditorData({ fileUsAtom, formIdx: formIdx })}
            onClick={() => setViewMode((v) => v === ViewMode.edit ? ViewMode.raw : ViewMode.edit)}
        >
            {/* <IconGear className="size-4 stroke-[0.7] hover:stroke-1" /> */}
            <SymbolPen className="w-3.5 h-3.5 stroke-[0.8] hover:stroke-1" />
        </button>
    );
}

export function ButtonCardOpenUrl({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const url = fileUs.parsedSrc.mani?.forms[0]?.detection?.web_ourl;
    const domain = fileUs.parsedSrc.meta?.[0]?.disp?.domain;
    return (<>
        {url &&
            <a
                href={url}
                target="_blank"
                rel="noopener"
                title={`Open this website: ${domain}`}
                onClick={(event) => event.stopPropagation()}
                className={itemClasses}
            >
                <SymbolOpenLink className="size-4" />
            </a>
        }
    </>);
}

//TODO: show edit button only when we can edit manifest
