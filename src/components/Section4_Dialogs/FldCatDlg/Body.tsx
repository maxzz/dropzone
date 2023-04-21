import React from "react";
import { useAtomValue } from "jotai";
import { FldCatItemsAtom } from "@/store";
import { DialogButtons, DialogHeader } from "../../Section2_Main/Panel2_Right/Body_Manifest/ManiSection3_Policy/PolicyEditorDlg/ui-sections";
import { FldCatItemsGrid } from "./FldCatItemsGrid";
import { classNames } from "@/utils";

const frameClasses = 'p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4';
const subSectionClasses = 'my-1 pb-2 text-xs text-primary-400 bg-primary-800 border-primary-700 border-b';

function SubTitle() {
    const totalItems = useAtomValue(FldCatItemsAtom).length;
    return (<>
        <div className={subSectionClasses}>
            {totalItems} catalog item{totalItems === 1 ? '' : 's'}
        </div>
    </>);
}

export function FldCatDlgBody() {
    return (
        <div className={classNames(frameClasses, "min-w-[540px]")}>
            <DialogHeader header="Field Catalog" />

            <div>
                <SubTitle />

                <div className="h-[50vh] min-h-[120px]">
                    <FldCatItemsGrid />
                </div>
            </div>

            {/* Buttons */}
            <DialogButtons />
        </div>
    );
}
