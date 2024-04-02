import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { a, useSpring } from '@react-spring/web';
import { UIIconUpDown } from '@ui/icons';
import { MatchWebStateAtom, urlsDirty } from './0-urls-dirty';

export function QurlGroup({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setDirty = useSetAtom(urls.dirtyAtom);
    const [isOpen, setIsOpen] = useState(false);

    const stylesDropdown = useSpring({
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        config: { duration: 200 },
    });

    return (<>
        <div className="mt-4 mb-1 flex items-center">
            <div className="w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    Quicklink url
                </div>
                <UIIconUpDown double={true} isUp={isOpen} className="size-5 border rounded" />
            </div>

            {urls.o === urls.q && (
                <label className="flex items-center text-xs">
                    <div className="ml-5">same as original url</div>
                </label>
            )}
        </div>

        {isOpen && (
            <a.div style={stylesDropdown}>
                <input
                    className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                    spellCheck={false}
                    value={urls.q}
                    onChange={(event) => {
                        const newState = { ...urls, q: event.target.value };
                        setUrls(newState);
                        setDirty(urlsDirty(newState));
                    }}
                />
            </a.div>
        )}
    </>);
}
