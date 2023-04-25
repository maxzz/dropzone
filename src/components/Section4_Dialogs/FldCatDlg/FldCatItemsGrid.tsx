import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { CatalogItem, FldCatItemsAtom } from "@/store";
import { fieldIcons } from "@/components/Section2_Main/Panel1_FilesList/Card/Card2_FormBody/CardFormBody2_Fields/FieldRowTypeIcon";
import { Scroller } from "@/components/Section2_Main/Panel2_Right/Scroller";
import { classNames } from "@/utils";

function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, }) || <div className="text-red-500">NaN</div>;
    return Icon;
}

const rowClasses = 'px-2 col-start-2 flex space-x-2';
const col1Classes = 'w-[4ch] text-right';
const col2Classes = 'w-[48%] flex items-center gap-x-2 leading-[18px]';
const col3Classes = 'w-[48%] whitespace-nowrap font-mono text-[.6rem]';

const tableHeaderClasses = 'mb-2 ml-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none';

function TableHeader() {
    return (
        <div className={rowClasses}>
            <div className={`${col1Classes} ${tableHeaderClasses}`}>#</div>
            <div className={`${col2Classes} ${tableHeaderClasses}`}>Name</div>
            <div className={`${col3Classes} ${tableHeaderClasses}`}>ID</div>
        </div>
    );
}

export function FldCatItemsGrid() {
    const names = useAtomValue(FldCatItemsAtom);
    const [selectedIdx, setSelectedIdx] = useState(-1);

    return (
        <Scroller className="pt-2 text-xs overflow-auto">
            <div className="grid grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)] text-primary-400">
                <TableHeader />
                {names.map(mapItem)}
            </div>
        </Scroller>
    );

    function mapItem(item: CatalogItem, idx: number) {
        return (
            <div
                className={classNames(
                    rowClasses,
                    "hover:bg-primary-700 cursor-default select-none",
                    selectedIdx === idx && "text-primary-900 bg-primary-400 rounded-sm hover:text-red-500 hover:bg-primay-400",
                )}
                key={idx}
                onClick={() => {
                    setSelectedIdx((v) => v !== idx ? idx : -1);
                }}
            >
                <div className={col1Classes}>
                    {idx + 1}
                </div>

                <div className={col2Classes}>
                    {FieldIcon(item.password, "w-4 h-4 opacity-25")}
                    <div className="whitespace-nowrap">
                        {item.dispname}
                    </div>
                </div>

                <div className={col3Classes}>
                    {item.dbname}
                </div>
            </div>
        );
    }
}
