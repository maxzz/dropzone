import React from "react";
import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { FldCatItemsAtom, FldCatOutDataAtom, fldCatOutDataAtom } from "@/store";
import { DialogButtons, DialogHeader } from "../../Section2_Main/Panel2_Right/Body_Manifest/ManiSection3_Policy/PolicyEditorDlg/ui-sections";
import { FldCatItemsGrid } from "./FldCatItemsGrid";
import { classNames } from "@/utils";

const frameClasses = 'p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4';
const subSectionClasses = 'my-1 pb-2 text-xs text-primary-400 bg-primary-800 border-primary-700 border-b';
const captionClasses = 'my-1 text-xs font-thin text-primary-400 bg-primary-800';

function SubTitle() {
    const totalItems = useAtomValue(FldCatItemsAtom).length;
    return (<>
        <div className={subSectionClasses}>
            {totalItems} catalog item{totalItems === 1 ? '' : 's'}
        </div>
    </>);
}

function Header() {
    const totalItems = useAtomValue(FldCatItemsAtom).length;
    return (<>
        <div className="pr-1 flex items-center justify-between">
            <div>Field Catalog</div>
            <div className={captionClasses}>({totalItems} item{totalItems === 1 ? '' : 's'})</div>
        </div>
    </>);
}

export function FldCatDlgBody({ setOpen, outDataAtom }: { setOpen: (open: boolean) => void; outDataAtom: FldCatOutDataAtom }) {
    const fldCatOutData = useSetAtom(outDataAtom);
    return (
        <div className={classNames(frameClasses, "min-w-[540px]")}>
            {/* <DialogHeader header="Field Catalog" /> */}
            {/* <DialogHeader header={<SubTitle />} /> */}
            <DialogHeader header={<Header />} />

            <div>
                {/* <SubTitle /> */}
                <div className="h-[50vh] min-h-[120px]">
                    <FldCatItemsGrid />
                </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex justify-end">
                <DialogButtons />

                <div
                    className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none"
                    onClick={() => {
                        setOpen(false);
                        fldCatOutData({ dbid: '55' });
                    }}
                >
                    Select
                </div>

            </div>
        </div>
    );
}
