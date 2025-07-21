import { useState } from "react";
import { useAtomValue } from "jotai";
import { IconCaseRegex, IconCaseSame, IconCaseSameDoc, UIIconUpDown } from "@ui/icons";
import { type UrlsEditorDataAtom } from "../0-all";
import { MatchHow } from "./1-murl-how";
import { AnimatedDropdown } from "../0-all/4-animated-dropdown";

export function Section_Murl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const m = useAtomValue(urlsEditorData.mAtom);

    const [isOpen, setIsOpen] = useState(o !== m);

    return (<>
        <div className="mt-4 mb-1 flex items-center">
            <div className="font-bold text-gray-600 flex items-center gap-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Matching url
                </div>
                <UIIconUpDown double={true} isUp={isOpen} className="size-5 border rounded" />

                <IconCaseSame className="ml-16 p-0.5 size-5 text-slate-500 border rounded" />
                <IconCaseRegex className="p-0.5 pt-1 size-5 text-slate-500 border rounded" />
                <IconCaseSameDoc className="p-0.5 size-5 border rounded" />
            </div>

            <ThesameAsOriginalUrl isTheSame={o === m} />
        </div>

        <AnimatedDropdown isOpen={isOpen}>
            <MatchHow urlsEditorDataAtom={urlsEditorDataAtom} />
        </AnimatedDropdown>
    </>);
}

function ThesameAsOriginalUrl({ isTheSame }: { isTheSame: boolean; }) {
    return (<>
        {isTheSame && (
            <label className="flex items-center text-xs">
                <div className="ml-5">
                    same as original url
                </div>
            </label>
        )}
    </>);
}
