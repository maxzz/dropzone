import React from 'react';
import { useAtom } from 'jotai';
import { filteredAtom } from '../store/store';
import Card, { CardWRef } from './Card/Card';
import UISimpleBar from './UI/UIScrollbar';
//import useVirtual, { Item } from 'react-cool-virtual';
import useVirtual from '../hooks/useVirtual/useVirtual';

function FilesList(props: React.HTMLAttributes<HTMLElement>) { //TODO: add compact view
    const { className, ...rest } = props;
    const [files] = useAtom(filteredAtom);
    return (
        <UISimpleBar className={`p-3 text-gray-500 bg-gray-700 ${className} overflow-auto w-full h-full`} {...rest}>
            <div className="grid grid-flow-row gap-4 text-sm">
                {files.map((atom) => <Card fileUsAtom={atom} className="" key={`${atom}`} />)}
            </div>
        </UISimpleBar>
    );
}

function FilesListNew(props: React.HTMLAttributes<HTMLElement>) { //TODO: add compact view
    const { className, ...rest } = props;
    const [files] = useAtom(filteredAtom);

    //const [len, setLen] = React.useState(files.length);

    // React.useEffect(() => {
    //     setLen(files.length);
    //  }, [files.length]);

    const { outerRef, innerRef, items } = useVirtual<HTMLDivElement, HTMLDivElement>({
        // itemCount: len,
        itemCount: files.length,
        //resetScroll: true,
        // itemSize: 141,
        // itemSize: (idx: number) => {
        //     console.log('idx', idx);
        //     return 141;
        // },
    });

    //console.log(`items dropped: ${files.length} virtual:`, items);

    return (
        <>
            <div ref={outerRef} className="w-full h-full overflow-auto">
                {/* <div ref={innerRef} className="relative grid grid-flow-row gap-4 text-sm"> */}
                <div ref={innerRef} className="text-sm">
                    {items.map(({ index, measureRef }) => {
                        const atom = files[index];
                        //console.log('item atom', atom);
                        if (!atom) {
                            return;
                        }

                        return (
                        //<div ref={measureRef} className="">
                            <CardWRef ref={measureRef} fileUsAtom={atom} className="mb-4" key={`${atom}`} />
                            // <CardWRef fileUsAtom={atom} className="mb-4" key={`${atom}`} />
                        //</div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default FilesList;
