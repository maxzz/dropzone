import { useAtom } from 'jotai';
import React from 'react';
import { filteredAtom } from '../store/store';
import ManifestCard from './Card/Card';
import UISimpleBar from './UI/UIScrollbar';

function FilesList() {
    const [files] = useAtom(filteredAtom);
    return (
        <div className="h-full w-full">
            <UISimpleBar className="h-full text-gray-500">
                <div className="grid grid-flow-row gap-4 text-sm">
                    {files.map((atom) =>
                        <ManifestCard atom={atom} key={`${atom}`} />
                    )}
                </div>
            </UISimpleBar>
        </div>
    );
}

export default FilesList;
