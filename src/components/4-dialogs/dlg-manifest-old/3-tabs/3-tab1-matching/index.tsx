import { MurlGroup } from './4-2-murl-group';
import { OurlGroup } from './4-1-ourl-group';
import { QurlGroup } from './4-3-qurl-group';
import { MatchWebStateAtom } from './4-0-urls-dirty';

export function Tab1_MatchWeb({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1">
                <OurlGroup urlsAtom={urlsAtom} />
                {/* Separator */} {/* <div className="mt-2 mb-4 w-full border-t border-gray-300" /> */}
                <MurlGroup urlsAtom={urlsAtom} />
                <QurlGroup urlsAtom={urlsAtom} />
            </div>
        </div>
    );
}
