import { useState } from "react";
import { useAtomValue } from "jotai";
import { a, useSpring } from "@react-spring/web";
import { Matching } from "@/store/manifest";
import { IconCaseRegex, IconCaseSame, IconCaseSameDoc, UIIconUpDown } from "@ui/icons";
import { MatchWebStateAtom } from "../0-all";
import { MatchHow } from "./1-murl-how";

export function Section_Murl({ editorUrlsAtom }: { editorUrlsAtom: MatchWebStateAtom; }) {
    const editorUrls = useAtomValue(editorUrlsAtom);
    const [isOpen, setIsOpen] = useState(editorUrls.current.o !== editorUrls.current.m);
    
    const [initialMD] = useState<Matching.RawMatchData>(() => Matching.parseRawMatchData(editorUrls.current.m));

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

            {editorUrls.current.o === editorUrls.current.m && (
                <label className="flex items-center text-xs">
                    <div className="ml-5">
                        same as original url
                    </div>
                </label>
            )}
        </div>

        {isOpen && (
            <a.div style={stylesDropdown}>
                <MatchHow urlsAtom={editorUrlsAtom} initialMD={initialMD} />
            </a.div>
        )}
    </>);
}
