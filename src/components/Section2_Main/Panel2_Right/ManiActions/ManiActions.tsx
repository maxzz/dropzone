import React from "react";
import { useAtomValue } from "jotai";
import { FileUsAtomType } from "@/store";
import { IconMenuHamburger, IconOpenLink } from "@ui/UIIconSymbols";
import { CardTitleMenu } from "./ManiMenu";
//import { PopoverMenu } from '@ui/nun/UIDropdownMenuLaag';
//import { CardMenu } from './nun/CardMenu';

function CardOpenUrl({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const url = fileUs.mani?.forms[0]?.detection.web_ourl;
    const domain = fileUs.meta?.[0]?.disp.domain;
    return (<>
        {url && <a
            href={url}
            target="_blank"
            rel="noopener"
            title={`Open ${domain}`}
            onClick={(event) => event.stopPropagation()}
        >
            <IconOpenLink className="w-4 h-4" />
        </a>
        }
    </>);
}

export function ManiActions({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div className="flex items-center space-x-1">
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
