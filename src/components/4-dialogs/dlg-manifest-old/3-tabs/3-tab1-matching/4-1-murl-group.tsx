import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { a, useSpring } from '@react-spring/web';
import { Matching } from '@/store/manifest';
import { UIIconUpDown } from '@ui/icons';
import { MatchHow } from './3-match-how';
import { MatchWebStateAtom } from './4-0-urls-dirty';

export function MurlGroup({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const urls = useAtomValue(urlsAtom);
    const [isOpen, setIsOpen] = useState(urls.o !== urls.m);
    const [initialMD] = useState<Matching.RawMatchData>(Matching.getMatchRawData(urls.m));

    const stylesDropdown = useSpring({
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        config: { duration: 200 },
    });

    return (<>
        <div className="mt-6 mb-1 flex items-center">
            <div className="w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Matching url
                </div>
                <UIIconUpDown double={true} isUp={isOpen} className="w-5 h-5 border rounded" />
            </div>

            {urls.o === urls.m && (
                <label className="flex items-center text-xs">
                    <div className="ml-5">
                        same as original url
                    </div>
                </label>
            )}
        </div>

        {isOpen && (
            <a.div style={stylesDropdown}>
                <MatchHow urlsAtom={urlsAtom} initialMD={initialMD} />
            </a.div>
        )}
    </>);
}
