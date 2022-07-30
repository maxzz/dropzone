import React, { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { FileUsAtomType } from "@/store";
import { IconMenuHamburger, IconOpenLink } from "@ui/UIIconSymbols";
import { CardTitleMenu } from "./CardTitleMenu";
//import { PopoverMenu } from '@ui/nun/UIDropdownMenuLaag';
//import { CardMenu } from './nun/CardMenu';

function CardOpenUrl({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const url = fileUs.mani?.forms[0]?.detection.web_ourl;
    const domain = fileUs.meta?.[0]?.disp.domain;
    if (!url) {
        return null;
    }
    return (
        <a href={url} target="_blank" rel="noopener" title={`Open ${domain}`} onClick={(event) => event.stopPropagation()}>
            <IconOpenLink className="w-4 h-4 mr-2" />
        </a>
    );
}

export function CardActions({ fileUsAtom }: { fileUsAtom: FileUsAtomType; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="absolute top-3 right-2 z-10 flex items-center">
            <CardOpenUrl fileUsAtom={fileUsAtom} />

            <CardTitleMenu fileUsAtom={fileUsAtom} icon={
                <div className="opacity-60 hover:opacity-100 active:scale-[.97]">
                    <IconMenuHamburger className="w-6 h-6" />
                </div>
            } />
            {/* <PopoverMenu /> */}
            {/* <CardMenu /> */}
        </div>
    );
}
