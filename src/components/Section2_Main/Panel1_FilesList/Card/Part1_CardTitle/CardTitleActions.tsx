import React, { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { FileUsAtomType } from "@/store";
import { IconMenuHamburger, IconOpenLink } from "@ui/UIIconSymbols";
import { CardTitleMenu } from "./CardTitleMenu";
import { classNames } from "@/utils/classnames";
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

export function CardTitleActions({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtomType; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("absolute top-1 right-2 z-10 flex items-center space-x-1", className)} {...rest}>
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

//TODO: move it to the rightPanel
