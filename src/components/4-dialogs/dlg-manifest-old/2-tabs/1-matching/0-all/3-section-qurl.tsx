import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { UIIconUpDown } from "@ui/icons";
import { type UrlsEditorDataAtom } from "./9-types";
import { setUrlsEditorDataAtom } from "./9-set-atoms";
import { AnimatedDropdown } from "./4-animated-dropdown";
import { ThesameAsOriginalUrl } from "./5-the-same-as-original";

export function Section_Qurl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);

    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const q = useAtomValue(urlsEditorData.qAtom);
    const isTheSame = o === q;

    const [isOpen, setIsOpen] = useState(!isTheSame);

    return (<>
        <div className="mt-4 mb-1 grid grid-cols-[repeat(2,minmax(0,max-content))_auto] items-center gap-x-1 cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-max font-bold text-gray-600">
                Quicklink url
            </div>
            <UIIconUpDown className="size-5" double={false} horizontal={true} isOpen={isOpen} />

            <ThesameAsOriginalUrl className="justify-self-end ml-5 text-xs" isTheSame={isTheSame} />
        </div>

        <AnimatedDropdown isOpen={isOpen}>
            <input
                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                spellCheck={false}
                value={q}
                onChange={(event) => setUrlsEditorData({ urlsEditorDataAtom, q: event.target.value })}
            />
        </AnimatedDropdown>
    </>);
}
