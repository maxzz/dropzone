import React, { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { fldCatItemsAtom, fldCatTriggerAtom } from "@/store";
import { fieldIcons } from "@/store/manifest/manifest-field-icons";
import { Scroller } from "@/components/2-main/Panel2_Right/scroller";
import { classNames } from "@/utils";

function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, }) || <div className="text-red-500">NaN</div>;
    return Icon;
}

const rowClasses = 'px-2 py-px col-start-2 flex items-center space-x-2';
const col1Classes = 'w-[4ch] text-right';
const col2Classes = 'w-[1.5rem] flex items-center justify-center gap-x-2 leading-[18px]';
const col3Classes = 'w-[41%] flex items-center gap-x-2 leading-[18px]';
const col4Classes = 'w-[44%] whitespace-nowrap font-mono text-[.6rem]';

const tableHeaderClasses = 'mb-2 ml-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none';

function TableHeader() {
    return (
        <div className={rowClasses}>
            <div className={`${col1Classes} ${tableHeaderClasses}`}>#</div>
            <div className={`${col2Classes} ${tableHeaderClasses}`}>Type</div>
            <div className={`${col3Classes} ${tableHeaderClasses}`}>Name</div>
            <div className={`${col4Classes} ${tableHeaderClasses}`}>ID</div>
        </div>
    );
}

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

    return (
        <Scroller className="pt-2 text-xs overflow-auto">
            <div className="grid grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)] text-primary-400">
                <TableHeader />
                {fldCatItems.map(mapItem)}
            </div>
        </Scroller>
    );

    function mapItem(item: CatalogItem, idx: number) {
        return (
            <div
                className={classNames(
                    rowClasses,
                    "cursor-default select-none",
                    selectedIdx === idx ? "text-primary-200 bg-primary-600 rounded-sm hover:text-primary-100 hover:bg-primay-400 transition-colors" : "hover:text-primary-200",
                )}
                onClick={() => setSelectedIdx((currentIdx) => currentIdx === idx ? -1 : idx)}
                onDoubleClick={() => { setSelectedIdx(prevSelectedIdx.current); needSelect && onDoubleClick(fldCatItems[prevSelectedIdx.current]); }}
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
}
