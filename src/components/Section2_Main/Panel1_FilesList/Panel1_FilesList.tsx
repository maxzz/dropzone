import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { filteredAtom, UISize, uiSizeAtom } from '@/store';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { classNames } from '@/utils/classnames';
import { Card } from './Card/Card';

//old: import Card, { CardWRef } from './Card/Card';
//old: import useVirtual, { Item } from 'react-cool-virtual';
//import useVirtual from '../../../hooks/useVirtual/useVirtual';

export function Panel1_FilesList({ className, ...rest }: HTMLAttributes<HTMLElement>) { //TODO: add compact view
    const files = useAtomValue(filteredAtom);
    const minimal = useAtomValue(uiSizeAtom) === UISize.minimal;
    return (
        <UISemiScrollbar className={classNames("p-3 text-gray-500 bg-gray-700 overflow-auto w-full h-full", className)} {...rest}>
            <div className={`grid ${minimal ? "gap-0.5" : "gap-4"}`}>
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
//TODO: sort by groups: the same site; by url; windows apps; problem apps.
//TODO: for fanniemae.com add check for single username wo/ password (single field login).