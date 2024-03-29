import React from 'react';
import { PrimitiveAtom } from 'jotai';
import { classNames } from '@/utils';
import { SymbolChevronDown, SymbolDot } from '@ui/icons';
import * as menu from '@radix-ui/react-dropdown-menu';

export function isKeyToClearDefault(key: string) {
    return key === 'Backspace' || /^[a-z0-9]$/i.test(key);
}

export function Dropdown(useItAtom: PrimitiveAtom<boolean>, items: string[], selectedIndex: number, onSetIndex: (idx: number) => void) {
    return (
        <menu.Root>
            <menu.Trigger asChild>
                <button className="px-2 border-l border-primary-800 outline-none group">
                    <SymbolChevronDown className="w-4 h-4 border-primary-500 rounded group-focus-within:border" />
                </button>
            </menu.Trigger>

            <menu.Portal container={document.getElementById('portal')}>
                <menu.Content
                    className={classNames(
                        "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                        "px-1.5 py-1 grid grid-cols-1 rounded-lg shadow-md",
                        "bg-primary-100 dark:bg-gray-800",
                        "overflow-auto max-h-[50vh] smallscroll smallscroll-light" //TODO: maybe have a separate popop for big list and add search; or simplescroll; more fields.. put on top?; scroll to view;
                    )}
                >
                    {items.map((item, idx) => {
                        const isSelected = selectedIndex === idx;
                        const isSeparator = item === '-';
                        return isSeparator
                            ? <menu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" key={idx} />
                            :
                            <menu.Item
                                className={classNames(
                                    "relative pl-8 pr-4 py-2 text-xs flex items-center cursor-default select-none rounded-md outline-none",
                                    "text-primary-700 data-highlighted:bg-primary-700 data-highlighted:text-primary-100",
                                    isSelected && "bg-primary-300"
                                )}
                                onSelect={() => onSetIndex(idx)}
                                key={idx}
                            >
                                {isSelected && <SymbolDot className="absolute left-2 w-5 h-5 fill-primary-700" />}
                                <span className="flex-grow">{item}</span>
                            </menu.Item>;
                    })}
                </menu.Content>
            </menu.Portal>
        </menu.Root>
    );
}
