import { useState, useRef } from "react";
import { useAtom } from "jotai";
import { useKey } from "react-use";
import { searchFilterData } from "@/store";
import { IconCaseSensitive, IconClose, IconSearch } from "@ui/icons";
import { classNames, turnOffAutoComplete } from "@/utils";

function ToggleCaseSensitive() {
    const [cs, setCs] = useAtom(searchFilterData.caseSensitiveAtom);
    return (
        <div
            className={`${cs ? 'bg-gray-500' : 'opacity-30'} cursor-pointer`}
            onClick={() => setCs(!cs)}
            title="Match Case"
        >
            <IconCaseSensitive className="size-4 border border-gray-400 rounded-sm" />
        </div>
    );
}

export function InputAndTrigger() {
    const [filterTxt, setFilterTxt] = useAtom(searchFilterData.textAtom);
    const isEmpty = !filterTxt;

    const [isActive, setIsActive] = useState(false);
    const keyboardRef = useRef<HTMLInputElement>(null);

    useKey('Escape', () => setFilterTxt(''), { target: keyboardRef.current });
    useKey((event) => event.ctrlKey && event.key === 'd', (event) => { event.preventDefault(); keyboardRef.current?.focus(); });

    return (
        <div
            className={classNames(isActive ? "h-8" : "h-7 py-0.5", isEmpty ? "w-12 rounded-full" : "w-full rounded-md", "px-2 flex items-center bg-gray-700 focus-within:bg-gray-600 border-2")}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            onClick={() => keyboardRef.current && keyboardRef.current.focus()}
        >
            <input
                ref={keyboardRef}
                className="w-full h-6 text-sm text-gray-200 bg-transparent focus:outline-none"
                value={filterTxt}
                onChange={(event) => setFilterTxt(event.target.value)}
                {...turnOffAutoComplete} />

            {isEmpty
                ? (
                    // Ctrl+D and Search icon
                    <div className="flex-none relative">
                        {/* shortcut icon small 'Ctrl' and text 'D' */}
                        {/*
                            {!isActive && (
                                <div className="absolute -left-3.5 -top-0.5 flex flex-col items-center text-gray-400 pointer-events-none">
                                    <IconCtrl className="size-3" />
                                    <div className="text-[.5rem] leading-[.5rem]">D</div>
                                </div>
                            )}
                        */}
                        <IconSearch className="size-4" />
                    </div>
                )
                : (<>
                    <ToggleCaseSensitive />
                    <IconClose onClick={() => setFilterTxt('')} className="size-6 p-0.5 cursor-pointer" />
                </>)}
        </div>
    );
}
