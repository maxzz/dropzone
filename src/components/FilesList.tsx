import { useAtom } from 'jotai';
import React from 'react';
import { filteredAtom } from '../store/store';
import Card from './Card/Card';
import UISimpleBar from './UI/UIScrollbar';

function FilesList(props: React.HTMLAttributes<HTMLElement>) { //TODO: add compact view
    const {className, ...rest} = props;
    const [files] = useAtom(filteredAtom);
    return (
        <UISimpleBar className={`p-3 text-gray-500 bg-gray-700 ${className} overflow-auto w-full h-full`} {...rest}>
            <div className="grid grid-flow-row gap-4 text-sm">
                {files.map((atom) => <Card atom={atom} className="" key={`${atom}`} />)}
            </div>
        </UISimpleBar>
    );
}

export default FilesList;
