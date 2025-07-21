import { useState } from "react";
import { useAtomValue } from "jotai";
import { a, useSpring } from "@react-spring/web";
import { IconCaseRegex, IconCaseSame, IconCaseSameDoc, UIIconUpDown } from "@ui/icons";
import { type UrlsEditorDataAtom } from "../0-all";
import { MatchHow } from "./1-murl-how";

export function Section_Murl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const m = useAtomValue(urlsEditorData.mAtom);

    const [isOpen, setIsOpen] = useState(o !== m);
    
    const stylesDropdown = useSpring({
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        config: { duration: 200 },
    });

    return (<>
        <div className="mt-4 mb-1 flex items-center">
            <div className="1w-28 font-bold text-gray-600 flex items-center gap-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Matching url
                </div>
                <UIIconUpDown double={true} isUp={isOpen} className="size-5 border rounded" />

                <IconCaseSame className="ml-16 p-0.5 size-5 text-slate-500 border rounded" />
                <IconCaseRegex className="p-0.5 pt-1 size-5 text-slate-500 border rounded" />
                <IconCaseSameDoc className="p-0.5 size-5 border rounded" />
            </div>

            {o === m && (
                <label className="flex items-center text-xs">
                    <div className="ml-5">
                        same as original url
                    </div>
                </label>
            )}
        </div>

        {isOpen && (
            <a.div style={stylesDropdown}>
                <MatchHow urlsEditorDataAtom={urlsEditorDataAtom} />
            </a.div>
        )}
    </>);
}
