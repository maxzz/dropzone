import React from 'react';
import { useAtom } from 'jotai';
import { searchFilterAtom, searchFilterCaseSensitiveAtom } from '../../store/store';
import { useKey } from 'react-use';
import { IconCaseSensitive, IconClose, IconCtrl, IconSearch } from '../UI/UiIcons';

function ToggleCaseSensitive() {
    const [cs, setCs] = useAtom(searchFilterCaseSensitiveAtom);
    return (
        <div
            className={`${cs ? 'bg-gray-500' : 'opacity-30'} cursor-pointer`}
            onClick={() => setCs(!cs)}
            title="Match Case"
        >
            <IconCaseSensitive className="w-4 h-4 border border-gray-400 rounded-sm" />
        </div>
    );
}

function FilterSearch() {
    const [filter, setFilter] = useAtom(searchFilterAtom);
    const keyboardRef = React.useRef<HTMLInputElement>(null);
    const [active, setActive] = React.useState(false);
    useKey('Escape', () => setFilter(''), { target: keyboardRef.current });
    useKey((event) => event.ctrlKey && event.key === 'd', (event) => { event.preventDefault(); keyboardRef.current && keyboardRef.current.focus(); });
    const isEmpty = !filter;
    return (
        <div className="flex-1 max-w-[40rem] ml-2 md:ml-4 sm:self-stretch md:self-end md:pb-2 lg:pb-0 lg:self-auto flex justify-end">
            <div
                className={`h-8 px-2 flex items-center bg-gray-700 focus-within:bg-gray-600 border-2 ${isEmpty ? 'w-12 rounded-full' : 'w-full rounded-md'}`}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                onClick={() => keyboardRef.current && keyboardRef.current.focus()}
                title="Search (Ctrl+D). Search prefix to show only: 'win:' Windows apps; 'web:' web apps; 'why:' logins with problems to check why"
        >
                <input
                    className="w-full h-6 text-sm text-gray-200 bg-transparent focus:outline-none"
                    spellCheck="false"
                    ref={keyboardRef}
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                />
                {isEmpty
                    ?
                    // Ctrl+D and Search icon
                    <div className="flex-none relative">
                        {!active && <div className="absolute -left-3.5 -top-0.5 flex flex-col items-center text-gray-400 pointer-events-none">
                            <IconCtrl className="w-3 h-3" />
                            <div className="text-[.5rem] leading-[.5rem]">D</div>
                        </div>}
                        <IconSearch className="w-4 h-4" />
                    </div>
                    : <>
                        <ToggleCaseSensitive />
                        <IconClose onClick={() => setFilter('')} className="w-6 h-6 p-0.5 cursor-pointer" />
                    </>
                }
            </div>
        </div>
    );
}

export default FilterSearch;

//TODO: add history to UI and store history to the localStorage
//TODO: win: and web: prefixes - done
