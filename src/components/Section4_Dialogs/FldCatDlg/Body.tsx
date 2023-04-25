import React, { useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FldCatItemsAtom, closeFldCatDialogAtom } from "@/store";
import { BottomButton, DialogHeader } from "../../Section2_Main/Panel2_Right/Body_Manifest/ManiSection3_Policy/PolicyEditorDlg/ui-sections";
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

export function FldCatDlgBody() {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);
    const selectedIdxAtom = useState(atom(-1))[0];

    const selectedIdx = useAtomValue(selectedIdxAtom);

    return (
        <div className={classNames(frameClasses, "min-w-[540px]")}>
            {/* <DialogHeader header="Field Catalog" /> */}
            {/* <DialogHeader header={<SubTitle />} /> */}
            <DialogHeader header={<Header />} />

            <div>
                {/* <SubTitle /> */}
                <div className="h-[50vh] min-h-[120px]">
                    <FldCatItemsGrid selectedIdxAtom={selectedIdxAtom} />
                </div>
            </div>

            <div className="">{selectedIdx + 1}</div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-x-2">
                <BottomButton>OK</BottomButton>
                <BottomButton>Cancel</BottomButton>
                <BottomButton onClick={() => closeFldCatDialog({ dbid: '44' })}>Select</BottomButton>
            </div>
        </div>
    );
}
