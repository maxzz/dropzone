import { useAtom } from 'jotai';
import React from 'react';
import { filteredAtom } from '../store/store';
import Card from './Card/Card';
import UISimpleBar from './UI/UIScrollbar';

function FilesList() { //TODO: add compact view
    const [files] = useAtom(filteredAtom);
    return (
        <div className="w-full h-[400px] overflow-y-auto">
            <UISimpleBar className="text-gray-500">
                <div className="grid grid-flow-row gap-4 text-sm">
                    {files.map((atom) => <Card atom={atom} className="" key={`${atom}`} />)}
                    {/* <div className="w-96 h-[2000px] bg-green-400"></div> */}
                </div>
            </UISimpleBar>
        </div>
    );
}

export default FilesList;
