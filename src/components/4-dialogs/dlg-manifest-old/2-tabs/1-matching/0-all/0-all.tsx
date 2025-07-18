import { type MatchWebStateAtom } from './9-types';
import { OurlGroup } from './1-group-ourl';
import { MurlGroup } from '../2-murl-group';
import { QurlGroup } from './3-group-qurl';

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
