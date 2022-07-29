import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { filteredAtom } from '@/store';
import { Card } from './Card/Card';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';

//old: import Card, { CardWRef } from './Card/Card';
//old: import useVirtual, { Item } from 'react-cool-virtual';
//import useVirtual from '../../../hooks/useVirtual/useVirtual';

export function Panel1_FilesList({ className, ...rest }: HTMLAttributes<HTMLElement>) { //TODO: add compact view
    const files = useAtomValue(filteredAtom);
    return (
        <UISemiScrollbar className={`p-3 text-gray-500 bg-gray-700 ${className} overflow-auto w-full h-full`} {...rest}>
            <div className="grid grid-flow-row gap-4 text-sm">
                {files.map((atom) => (
                    <Card fileUsAtom={atom} key={`${atom}`} />
                ))}
            </div>
        </UISemiScrollbar>
    );
}
/*
function Panel1_FilesListNew({ className, ...rest }: HTMLAttributes<HTMLElement>) { //TODO: add compact view
    const files = useAtomValue(filteredAtom);

    //const [len, setLen] = useState(files.length);

    // useEffect(() => {
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
                {/* <div ref={innerRef} className="relative grid grid-flow-row gap-4 text-sm"> * /}
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
*/
//TODO: we can use alternative solutins: virtual list; pagination; popup; right panel; ...
//TODO: add filter by website domain
