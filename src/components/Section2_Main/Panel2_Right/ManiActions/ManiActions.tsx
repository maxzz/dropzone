import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { FileUsAtomType, formEditorDataAtom } from "@/store";
import { IconGear, IconMenuHamburger, IconOpenLink } from "@ui/UIIconSymbols";
import { CardTitleMenu } from "./ManiMenu";
//import { PopoverMenu } from '@ui/nun/UIDropdownMenuLaag';
//import { CardMenu } from './nun/CardMenu';

function CardOpenUrl({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const url = fileUs.mani?.forms[0]?.detection?.web_ourl;
    const domain = fileUs.meta?.[0]?.disp?.domain;
    return (<>
        {url &&
            <a
                href={url}
                target="_blank"
                rel="noopener"
                title={`Open ${domain}`}
                onClick={(event) => event.stopPropagation()}
                className="p-1 w-8 h-8 hover:bg-primary-700 rounded active:scale-[.97] flex items-center justify-center outline-none focus:ring-1 ring-primary-400"
            >
                <IconOpenLink className="w-4 h-4" />
            </a>
        }
    </>);
}

export function CardEdit({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: number; }) {
    const setFormEditorData = useSetAtom(formEditorDataAtom);
    return (
        <button
            className={`p-1 w-8 h-8 hover:bg-primary-700 rounded active:scale-[.97] flex items-center justify-center outline-none focus:ring-1 ring-primary-400`}
            onClick={() => setFormEditorData({ fileUsAtom, formIdx: formIdx })}
            title="Edit detection options"
        >
            <IconGear className="w-4 h-4 stroke-[0.7] hover:stroke-[1]" />
        </button>
    );
}

export function ManiActions({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div className="flex items-center">
            <CardEdit fileUsAtom={fileUsAtom} formIdx={0} />
            <CardOpenUrl fileUsAtom={fileUsAtom} />

            <CardTitleMenu
                fileUsAtom={fileUsAtom}
                icon={
                    <IconMenuHamburger className="w-8 h-8 p-1 stroke-[0.8] hover:bg-primary-700 rounded opacity-60 hover:opacity-100 active:scale-[.97] outline-none focus:ring-1 ring-primary-400" />
                }
            />

            {/* <PopoverMenu /> */}
            {/* <CardMenu /> */}
        </div>
    );
}
