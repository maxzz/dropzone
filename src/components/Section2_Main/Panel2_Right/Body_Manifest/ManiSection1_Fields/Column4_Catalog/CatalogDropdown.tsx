import React from 'react';
import { PrimitiveAtom } from 'jotai';
import { classNames } from '@/utils';
import { IconChevronDown, IconDot } from '@ui/UIIconSymbols';
import * as menu from '@radix-ui/react-dropdown-menu';

export function isKeyToClearDefault(key: string) {
    return key === 'Backspace' || /^[a-z0-9]$/i.test(key);
}

type CatalogDropdownProps = {
    items: string[];
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

export function CatalogDropdown({ items, selectedIndex, onSetIndex }: CatalogDropdownProps) {
    return (
        <menu.Root>
            <menu.Trigger asChild>
                <button className="px-2 border-l border-primary-800 outline-none group">
                    <IconChevronDown className="w-4 h-4 border-primary-500 rounded group-focus-within:border" />
                </button>
            </menu.Trigger>

            <menu.Portal container={document.getElementById('portal')}>
                <menu.Content
                    className={classNames(
                        "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                        "mx-4 px-1 py-1 grid grid-cols-1 rounded-lg shadow-md",
                        "bg-primary-100 dark:bg-gray-800",
                        "overflow-auto max-h-[50vh] smallscroll smallscroll-light" //TODO: maybe have a separate popop for big list and add search; or simplescroll; more fields.. put on top?; scroll to view;
                    )}
                >
                    {items.map(CatalogItem)}
                </menu.Content>
            </menu.Portal>
        </menu.Root>
    );

    function CatalogItem(showText: string, idx: number): JSX.Element {
        const isSelected = idx === selectedIndex;
        const rv = showText === '-'
            ?
            <menu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" key={idx} />
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
                {isSelected && <IconDot className="absolute left-2 w-5 h-5 fill-primary-700" />}
                <span className="ml-2 flex-grow self-start">{showText}</span>
            </menu.Item>;
        return rv;
    }
}
