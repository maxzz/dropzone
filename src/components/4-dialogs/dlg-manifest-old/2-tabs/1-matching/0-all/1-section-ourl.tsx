import { useAtomValue, useSetAtom } from "jotai";
import { UrlsEditorDataAtom } from "./9-types";
import { setUrlsEditorDataAtom } from "./9-set-atoms";
import { SectionName } from "./6-section-name";

export function Section_Ourl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);

    return (<>
        <SectionName>Original url</SectionName>
        <input
            className="flex-1 px-2 py-1.5 w-full min-w-0 border border-gray-400 rounded shadow-inner"
            spellCheck={false}
            value={o}
            onChange={(event) => setUrlsEditorData({ urlsEditorDataAtom, o: event.target.value })}
        />
    </>);
}
