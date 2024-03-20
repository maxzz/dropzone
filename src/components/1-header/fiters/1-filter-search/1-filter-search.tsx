import React from 'react';
import { useAtom } from 'jotai';
import { useKey } from 'react-use';
import { turnOffAutoComplete } from '@/utils';
import { searchFilterData } from '@/store';
import { IconCaseSensitive, IconClose, SymbolDot, IconSearch } from '@ui/icons';
import { UiTip } from '@ui/ui-tooltip';

function ToggleCaseSensitive() {
    const [cs, setCs] = useAtom(searchFilterData.caseSensitiveAtom);
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

function TipTrigger() {
    const [filterTxt, setFilterTxt] = useAtom(searchFilterData.textAtom);
    const isEmpty = !filterTxt;

    const [isActive, setIsActive] = React.useState(false);
    const keyboardRef = React.useRef<HTMLInputElement>(null);

    useKey('Escape', () => setFilterTxt(''), { target: keyboardRef.current });
    useKey((event) => event.ctrlKey && event.key === 'd', (event) => { event.preventDefault(); keyboardRef.current && keyboardRef.current.focus(); });
    return (
        <div className={``}>
            <div
                className={`${isActive ? 'h-8' : 'h-7 py-0.5'} px-2 flex items-center bg-gray-700 focus-within:bg-gray-600 border-2 ${isEmpty ? 'w-12 rounded-full' : 'w-full rounded-md'}`}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                onClick={() => keyboardRef.current && keyboardRef.current.focus()}
            >
                <input
                    ref={keyboardRef}
                    className="w-full h-6 text-sm text-gray-200 bg-transparent focus:outline-none"
                    value={filterTxt}
                    onChange={(event) => setFilterTxt(event.target.value)}
                    {...turnOffAutoComplete}
                />

                {isEmpty
                    ?
                    // Ctrl+D and Search icon
                    <div className="flex-none relative">
                        {/* Ctrl+D */}
                        {/*
                                    {!active && <div className="absolute -left-3.5 -top-0.5 flex flex-col items-center text-gray-400 pointer-events-none">
                                        <IconCtrl className="w-3 h-3" />
                                        <div className="text-[.5rem] leading-[.5rem]">D</div>
                                    </div>}
                                    */}
                        <IconSearch className="w-4 h-4" />
                    </div>
                    :
                    <>
                        <ToggleCaseSensitive />
                        <IconClose onClick={() => setFilterTxt('')} className="w-6 h-6 p-0.5 cursor-pointer" />
                    </>
                }
            </div>
        </div>
    );
}

function PopupContent() {
    return (
        <div className="text-sm py-1 px-1">
            <div className="font-bold">Search (Ctrl+D)</div>
            <div className="pb-1">Use the search prefix to dispay only:</div>
            <div className=""><SymbolDot className="w-3 h-3 inline" fill="none" stroke="black" /><span className="inline-block font-bold font-mono tracking-tight w-8">win:</span> logins for Windows apps</div>
            <div className=""><SymbolDot className="w-3 h-3 inline" fill="none" stroke="black" /><span className="inline-block font-bold font-mono tracking-tight w-8">web:</span> logins for web apps</div>
            <div className=""><SymbolDot className="w-3 h-3 inline" fill="none" stroke="black" /><span className="inline-block font-bold font-mono tracking-tight w-8">why:</span> logins with problems to check why</div>
            <div className=""><SymbolDot className="w-3 h-3 inline" fill="none" stroke="black" /><span className="inline-block font-bold font-mono tracking-tight w-8">cap:</span> logins with window caption</div>
            <div className=""><SymbolDot className="w-3 h-3 inline" fill="none" stroke="black" /><span className="inline-block font-bold font-mono tracking-tight w-8">cls:</span> logins with window classname</div>
        </div>
    );
}

export function FilterSearch() {
    return (
        <div className="flex-1 min-h-[32px] max-w-[40rem] ml-2 md:ml-4 sm:self-stretch md:self-end md:pb-2 lg:pb-0 lg:self-auto flex justify-end items-center">
            <UiTip
                trigger={<TipTrigger />}
                arrow
                popperOptions={{
                    delayShow: 700,
                    offset: [0, 8],
                    //defaultVisible: true,
                }}
            >
                <PopupContent />
            </UiTip>
        </div>
    );
}

//TODO: add history to UI and store history to the localStorage
//TODO: win: and web: prefixes - done
