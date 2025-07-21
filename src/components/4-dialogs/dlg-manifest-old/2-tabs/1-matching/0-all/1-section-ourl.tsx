import { useAtomValue, useSetAtom } from "jotai";
import { UrlsEditorDataAtom } from "./9-types";
import { setUrlsEditorDataAtom } from "./7-set-atoms";

export function Section_Ourl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);

    return (
        <div className="mb-1 flex items-center justify-between gap-2">
            <div className="font-bold text-gray-600">
                Original url
            </div>

            <input
                className="flex-1 px-2 py-1.5 w-full min-w-0 border border-gray-400 rounded shadow-inner"
                spellCheck={false}
                value={o}
                onChange={(event) => setUrlsEditorData({ urlsEditorDataAtom, o: event.target.value })}
            />
        </div>
    );
}
