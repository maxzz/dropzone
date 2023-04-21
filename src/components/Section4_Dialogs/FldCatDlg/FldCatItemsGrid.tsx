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
        <div className={`col-start-1 mr-4 text-right ${tableHeaderClasses}`}>#</div>
        <div className={`col-start-2 ${tableHeaderClasses}`}>Name</div>
        <div className={`col-start-3 ml-4 ${tableHeaderClasses}`}>ID</div>
    </>);
}

export function FldCatItemsGrid() {
    const names = useAtomValue(FldCatItemsAtom);
    return (
        <Scroller className="pt-2 text-xs overflow-auto">
            <div className="grid grid-cols-[auto_1fr_auto] text-primary-400">
                <TableHeader />
                {names.map(mapItem)}
            </div>
        </Scroller>
    );

    function mapItem(item: CatalogItem, idx: number) {
        return (
            <Fragment key={idx}>
                <div className="mr-4 col-start-1 text-right">
                    {idx + 1}
                </div>

                <div className="col-start-2 flex items-center gap-x-2 leading-[18px]">
                    {FieldIcon(item.password, "w-4 h-4 opacity-25")}
                    <div>
                        {item.dispname}
                    </div>
                </div>

                <div className="ml-4 col-start-3 font-mono text-[.6rem]">
                    {item.dbname}
                </div>
            </Fragment>
        );
    }
}
