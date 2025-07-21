import { useAtomValue } from "jotai";
import { SymbolAttention } from "@ui/icons";
import { UrlsEditorDataAtom } from "../2-tabs/1-matching";
//import { toastWarning } from "@ui/UIToaster";

const shadowStyles = { filter: 'drop-shadow(#f66b3b7a 0px 0px 0.15rem)' };

export function ManiModifiedIndicator({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const isChanged = useAtomValue(urlsEditorData.isChangedAtom);

    if (!isChanged) {
        return null;
    }

    return (
        <SymbolAttention className="self-end size-4 text-[#f6673b] fill-[#ffad42]" style={shadowStyles} title="Modified" />
    );
}

// fill variations #ff5400 stroke="#f6673b" strokeWidth={0.8}
