import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { FileUsAtomType, formEditorDataAtom, rightPanelData, ViewMode } from "@/store";
import { IconGear, IconMenuHamburger, IconOpenLink, IconPen } from "@ui/icons";

export function CardOpenUrl({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const url = fileUs.mani?.forms[0]?.detection?.web_ourl;
    const domain = fileUs.meta?.[0]?.disp?.domain;
    return (<>
        {url &&
            <a
                href={url}
                target="_blank"
                rel="noopener"
                title={`Open this website: ${domain}`}
                onClick={(event) => event.stopPropagation()}
                className="p-1 w-8 h-8 hover:bg-primary-700 rounded active:scale-[.97] flex items-center justify-center outline-none focus:ring-1 ring-primary-400"
            >
                <IconOpenLink className="w-4 h-4" />
            </a>
        }
    </>);
}

export function CardEdit({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: number; }) {
    //const setFormEditorData = useSetAtom(formEditorDataAtom);
    const setViewMode = useSetAtom(rightPanelData.viewModeAtom);
    return (
        <button
            className={`p-1 w-8 h-8 hover:bg-primary-700 rounded active:scale-[.97] flex items-center justify-center outline-none focus:ring-1 ring-primary-400`}
            title="Switch to manifest editing mode"
            //onClick={() => setFormEditorData({ fileUsAtom, formIdx: formIdx })}
            onClick={() => setViewMode((v) => v === ViewMode.edit ? ViewMode.raw : ViewMode.edit)}
        >
            {/* <IconGear className="w-4 h-4 stroke-[0.7] hover:stroke-[1]" /> */}
            <IconPen className="w-3.5 h-3.5 stroke-[0.8] hover:stroke-[1]" />
        </button>
    );
}

//TODO: show edit button only when we can edit manifest
