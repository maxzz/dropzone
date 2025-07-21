import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { a, useSpring } from "@react-spring/web";
import { UIIconUpDown } from "@ui/icons";
import { type UrlsEditorDataAtom } from "./9-types";
import { setUrlsEditorDataAtom } from "./7-set-atoms";

export function Section_Qurl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const q = useAtomValue(urlsEditorData.qAtom);
    const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);

    const [isOpen, setIsOpen] = useState(false);

    const stylesDropdown = useSpring({
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        config: { duration: 200 },
    });

    return (<>
        <div className="mt-4 mb-1 flex items-center">
            <div className="w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Quicklink url
                </div>
                <UIIconUpDown double={true} isUp={isOpen} className="size-5 border rounded" />
            </div>

            {o === q && (
                <label className="flex items-center text-xs">
                    <div className="ml-5">same as original url</div>
                </label>
            )}
        </div>

        {isOpen && (
            <a.div style={stylesDropdown}>
                <input
                    className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                    spellCheck={false}
                    value={q}
                    onChange={(event) => setUrlsEditorData({ urlsEditorDataAtom, q: event.target.value })}
                />
            </a.div>
        )}
    </>);
}
