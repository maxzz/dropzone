import { type UrlsEditorDataAtom } from "./9-types";
import { Section_Ourl } from "./1-section-ourl";
import { Section_Murl } from "./2-section-murl";
import { Section_Qurl } from "./3-section-qurl";

export function Tab1_MatchWeb({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    return (
        <div className="p-4 grid">
            <Section_Ourl urlsEditorDataAtom={urlsEditorDataAtom} />
            <Section_Murl urlsEditorDataAtom={urlsEditorDataAtom} />
            <Section_Qurl urlsEditorDataAtom={urlsEditorDataAtom} />
        </div>
    );
}
