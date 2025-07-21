import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { UIIconUpDown } from "@ui/icons";
import { type UrlsEditorDataAtom } from "./9-types";
import { setUrlsEditorDataAtom } from "./9-set-atoms";
import { AnimatedDropdown } from "./4-animated-dropdown";

export function Section_Qurl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const q = useAtomValue(urlsEditorData.qAtom);
    const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);

    const [isOpen, setIsOpen] = useState(false);

    return (<>
        <div className="mt-4 mb-1 flex items-center">
            <div className="w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Quicklink url
                </div>
                <UIIconUpDown double={true} isUp={isOpen} className="size-5 border rounded" />
            </div>

            <ThesameAsOriginalUrl isTheSame={o === q} />
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

function ThesameAsOriginalUrl({ isTheSame }: { isTheSame: boolean; }) {
    return (<>
        {isTheSame && (
            <label className="flex items-center text-xs">
                <div className="ml-5 text-xs">
                    same as original url
                </div>
            </label>
        )}
    </>);
}
