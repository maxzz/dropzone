import { useAtom } from 'jotai';
import React from 'react';
import { filteredAtom } from '../store/store';
import Card from './Card/Card';
import UISimpleBar from './UI/UIScrollbar';

function FilesList() { //TODO: add compact view
    const [files] = useAtom(filteredAtom);
    return (
        <div className="h-full w-full">
            <UISimpleBar className="h-full text-gray-500">
                <div className="grid grid-flow-row gap-4 text-sm">
                    {files.map((atom) => <Card atom={atom} className="min-w-[500px]" key={`${atom}`} />)}
                </div>
            </UISimpleBar>
        </div>
    );
}

export default FilesList;
