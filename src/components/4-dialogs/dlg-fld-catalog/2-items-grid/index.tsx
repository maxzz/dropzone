import { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { fldCatItemsAtom, fldCatTriggerAtom } from "@/store";
import { Scroller } from "@ui/scroller";
import { classNames } from "@/utils";
import { TableHeader, rowClasses, col1Classes, col2Classes, col3Classes, col4Classes } from "./1-header";
import { FieldIcon } from "./4-field-icon";

export function FldCatItemsGrid({ selectedItemAtom, onDoubleClick }: { selectedItemAtom: PrimitiveAtom<CatalogItem | null>; onDoubleClick: (item: CatalogItem) => void; }) {
    const fldCatItems = useAtomValue(fldCatItemsAtom);
    const setSelectedItem = useSetAtom(selectedItemAtom);

    const selectedIdxAtom = useState(atom(-1))[0];
    const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    const prevSelectedIdx = useRef(selectedIdx);

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    useEffect(() => {
        if (selectedIdx !== -1) {
            prevSelectedIdx.current = selectedIdx;
        }
        setSelectedItem(selectedIdx === -1 ? null : fldCatItems[selectedIdx]);
    }, [selectedIdx]);

    const itemClick = (idx: number) => setSelectedIdx((currentIdx) => currentIdx === idx ? -1 : idx);
    const itemDoubleClick = () => { setSelectedIdx(prevSelectedIdx.current); needSelect && onDoubleClick(fldCatItems[prevSelectedIdx.current]); };

    return (
        <Scroller className="pt-2 text-xs overflow-auto">
            <div className="grid grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)] text-primary-400">
                <TableHeader />
                
                {/* {fldCatItems.map(mapItem)} */}
                {fldCatItems.map((item, idx) => (
                    <MapItem item={item} idx={idx} selectedIdx={selectedIdx} itemClick={itemClick} itemDoubleClick={itemDoubleClick} key={idx} />
                ))}
            </div>
        </Scroller>
    );

    // function mapItem(item: CatalogItem, idx: number) {
    //     return (
    //         <div
    //             className={classNames(
    //                 rowClasses,
    //                 "cursor-default select-none",
    //                 selectedIdx === idx ? "text-primary-200 bg-primary-600 rounded-sm hover:text-primary-100 hover:bg-primay-400 transition-colors" : "hover:text-primary-200",
    //             )}
    //             onClick={() => itemClick(idx)}
    //             onDoubleClick={() => itemDoubleClick()}
    //             key={idx}
    //         >
    //             <div className={col1Classes}>
    //                 {idx + 1}
    //             </div>

    //             <div className={col2Classes}>
    //                 {FieldIcon(item.password, "w-4 h-4 opacity-50")}
    //             </div>

    //             <div className={`${col3Classes} whitespace-nowrap`}>
    //                 {item.displayname}
    //             </div>

    //             <div className={col4Classes}>
    //                 {item.dbname}
    //             </div>
    //         </div>
    //     );
    // }
}

function MapItem({ item, idx, selectedIdx, itemClick, itemDoubleClick }: { item: CatalogItem; idx: number; selectedIdx: number; itemClick: (idx: number) => void; itemDoubleClick: () => void; }) {
    return (
        <div
            className={classNames(
                rowClasses,
                "cursor-default select-none",
                selectedIdx === idx ? "text-primary-200 bg-primary-600 rounded-sm hover:text-primary-100 hover:bg-primay-400 transition-colors" : "hover:text-primary-200",
            )}
            onClick={() => itemClick(idx)}
            onDoubleClick={() => itemDoubleClick()}
            key={idx}
        >
            <div className={col1Classes}>
                {idx + 1}
            </div>

            <div className={col2Classes}>
                {FieldIcon(item.password, "w-4 h-4 opacity-50")}
            </div>

            <div className={`${col3Classes} whitespace-nowrap`}>
                {item.displayname}
            </div>

            <div className={col4Classes}>
                {item.dbname}
            </div>
        </div>
    );
}
