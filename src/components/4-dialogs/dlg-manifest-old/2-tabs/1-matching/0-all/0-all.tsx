import { type MatchWebStateAtom } from "./9-types";
import { Section_Ourl } from "./1-section-ourl";
import { Section_Murl } from "../2-murl-group";
import { Section_Qurl } from "./3-section-qurl";

export function Tab1_MatchWeb({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1">
                <Section_Ourl urlsAtom={urlsAtom} />
                {/* Separator */} {/* <div className="mt-2 mb-4 w-full border-t border-gray-300" /> */}
                <Section_Murl urlsAtom={urlsAtom} />
                <Section_Qurl urlsAtom={urlsAtom} />
            </div>
        </div>
    );
}
