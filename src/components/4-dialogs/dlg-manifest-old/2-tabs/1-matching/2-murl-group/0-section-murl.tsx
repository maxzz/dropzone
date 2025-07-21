import { useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { IconCaseRegex, IconCaseSame, IconCaseSameDoc, UIIconUpDown } from "@ui/icons";
import { type UrlsEditorDataAtom } from "../0-all";
import { MatchHow } from "./1-murl-how";
import { AnimatedDropdown } from "../0-all/4-animated-dropdown";
import { ThesameAsOriginalUrl } from "../0-all/5-the-same-as-original";
import { SectionName } from "../0-all/6-section-name";

export function Section_Murl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const m = useAtomValue(urlsEditorData.mAtom);
    const isTheSame = o === m;

    const [isOpen, setIsOpen] = useState(!isTheSame);

    return (<>
        <div className="mt-4 cursor-pointer flex items-center gap-x-1 select-none" onClick={() => setIsOpen(!isOpen)}>
            <SectionName>Matching url</SectionName>
            <UIIconUpDown className={classNames("size-5 fill-black", !isOpen && "mb-0.5")} double={false} horizontal={true} isOpen={isOpen} />

            <IconCaseSame className="ml-20 p-0.5 size-4 text-slate-500 border rounded" />
            <IconCaseRegex className="p-0.5 pt-1 size-4 text-slate-500 border rounded" />
            <IconCaseSameDoc className="p-0.5 size-4 border rounded" />

            <ThesameAsOriginalUrl className="flex-auto text-end ml-4 text-xs" isTheSame={isTheSame} isOpen={isOpen} />
        </div>

        <AnimatedDropdown isOpen={isOpen}>
            <MatchHow urlsEditorDataAtom={urlsEditorDataAtom} />
        </AnimatedDropdown>
    </>);
}
