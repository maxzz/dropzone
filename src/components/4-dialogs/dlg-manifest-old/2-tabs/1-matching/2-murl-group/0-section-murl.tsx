import { useState } from "react";
import { useAtomValue } from "jotai";
import { IconCaseRegex, IconCaseSame, IconCaseSameDoc, UIIconUpDown } from "@ui/icons";
import { type UrlsEditorDataAtom } from "../0-all";
import { MatchHow } from "./1-murl-how";
import { AnimatedDropdown } from "../0-all/4-animated-dropdown";
import { ThesameAsOriginalUrl } from "../0-all/5-the-same-as-original";

export function Section_Murl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const m = useAtomValue(urlsEditorData.mAtom);

    const [isOpen, setIsOpen] = useState(o !== m);

    return (<>
        <div className="mt-4 mb-1 flex items-center">
            <div className="font-bold text-gray-600 cursor-pointer flex items-center gap-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Matching url
                </div>
                <UIIconUpDown double={false} horizontal={true} isOpen={isOpen} className="size-5" />

                <IconCaseSame className="ml-16 p-0.5 size-5 text-slate-500 border rounded" />
                <IconCaseRegex className="p-0.5 pt-1 size-5 text-slate-500 border rounded" />
                <IconCaseSameDoc className="p-0.5 size-5 border rounded" />
            </div>

            <ThesameAsOriginalUrl className="ml-5 text-xs" isTheSame={o === m} />
        </div>

        <AnimatedDropdown isOpen={isOpen}>
            <MatchHow urlsEditorDataAtom={urlsEditorDataAtom} />
        </AnimatedDropdown>
    </>);
}
