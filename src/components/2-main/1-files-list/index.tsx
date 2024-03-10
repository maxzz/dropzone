import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { filteredAtom, UISize, uiSizeAtom } from '@/store';
import { UiSemiScrollbar } from '@ui/ui-semi-scrollbar';
import { classNames } from '@/utils';
import { Card } from './Card';

export function Panel1_FilesList({ className, ...rest }: HTMLAttributes<HTMLElement>) { //TODO: add compact view
    const files = useAtomValue(filteredAtom);
    const minimal = useAtomValue(uiSizeAtom) === UISize.minimal;
    return (
        <UiSemiScrollbar className={classNames("p-3 text-gray-500 bg-gray-700 overflow-auto w-full h-full", className)} {...rest}>
            <div className={`grid ${minimal ? "gap-0.5" : "gap-4"}`}>
                {files.map((atom) => (
                    <Card fileUsAtom={atom} key={`${atom}`} />
                ))}
            </div>
        </UiSemiScrollbar>
    );
}

//TODO: we can use alternative solutins: virtual list; pagination; popup; right panel; ...
//TODO: add filter by website domain
//TODO: add isolate by domain of selected manifest
//TODO: sort by domain
//TODO: save selected files to separate folder
//TODO: sort by groups: the same site; by url; windows apps; problem apps.
//TODO: for fanniemae.com add check for single username wo/ password (single field login).
