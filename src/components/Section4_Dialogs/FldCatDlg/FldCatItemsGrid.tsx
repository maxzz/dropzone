import React, { Fragment } from "react";
import { useAtomValue } from "jotai";
import { CatalogItem, FldCatItemsAtom } from "@/store";
import { fieldIcons } from "@/components/Section2_Main/Panel1_FilesList/Card/Card2_FormBody/CardFormBody2_Fields/FieldRowTypeIcon";
import { Scroller } from "@/components/Section2_Main/Panel2_Right/Scroller";

function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, }) || <div className="text-red-500">NaN</div>;
    return Icon;
}

const tableHeaderClasses = 'mb-2 text-[.65rem] text-primary-400 border-primary-100 border-b select-none';

function TableHeader() {
    return (<>
        <div className={`col-start-2 text-right ${tableHeaderClasses}`}>#</div>
        <div className={`col-start-3 ${tableHeaderClasses}`}>Name</div>
        <div className={`col-start-4 ${tableHeaderClasses}`}>ID</div>
    </>);
}

export function FldCatItemsGrid() {
    const names = useAtomValue(FldCatItemsAtom);
    return (
        <div className="grid grid-rows-[auto_minmax(0,1fr)]">

            <div className="px-4 py-3 text-xs text-primary-400 bg-primary-800 border-primary-700 border-b">
                {/* filters */}
                {names.length} item{names.length === 1 ? '' : 's'}
            </div>

            <Scroller className="pt-2 text-xs overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] gap-x-4 text-primary-400">
                    <TableHeader />
                    {names.map(mapItem)}
                </div>
            </Scroller>
        </div>
    );

    function mapItem(item: CatalogItem, idx: number) {
        return (
            <Fragment key={idx}>
                <div className="col-start-2 text-right">
                    {idx + 1}
                </div>

                <div className="col-start-3 flex items-center gap-x-2 leading-[18px]">
                    {FieldIcon(item.password, "w-4 h-4 opacity-25")}
                    <div>
                        {item.dispname}
                    </div>
                </div>

                <div className="col-start-4 font-mono text-[.6rem]">
                    {item.dbname}
                </div>
            </Fragment>
        );
    }
}
