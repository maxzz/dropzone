import React, { ButtonHTMLAttributes, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { fldCatItemsAtom, closeFldCatDialogAtom, fldCatTriggerAtom, CatalogItem } from "@/store";
import { BottomButton, DialogHeader } from "../../Section2_Main/Panel2_Right/Body_Manifest/ManiSection3_Policy/PolicyEditorDlg/ui-sections";
import { FldCatItemsGrid } from "./FldCatItemsGrid";
import { classNames } from "@/utils";

const frameClasses = 'p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4';
const subSectionClasses = 'my-1 pb-2 text-xs text-primary-400 bg-primary-800 border-primary-700 border-b';
const captionClasses = 'my-1 text-xs font-thin text-primary-400 bg-primary-800';

function SubTitle() {
    const totalItems = useAtomValue(fldCatItemsAtom).length;
    return (
        <div className={subSectionClasses}>
            {totalItems} catalog item{totalItems === 1 ? '' : 's'}
        </div>
    );
}

function Header() {
    const totalItems = useAtomValue(fldCatItemsAtom).length;
    return (
        <div className="pr-1 flex items-center justify-between">
            <div>Field Catalog</div>
            <div className={captionClasses}>({totalItems} item{totalItems === 1 ? '' : 's'})</div>
        </div>
    );
}

// export function SelectButton({ selectedIdxAtom, ...rest }: { selectedIdxAtom: PrimitiveAtom<number>; } & ButtonHTMLAttributes<HTMLButtonElement>) {
//     const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);

//     const selectedIdx = useAtomValue(selectedIdxAtom);
//     const fldCatItems = useAtomValue(fldCatItemsAtom);

//     return (
//         <BottomButton
//             className={classNames("disabled:opacity-25")}
//             disabled={selectedIdx === -1}
//             onClick={() => closeFldCatDialog({ dbid: fldCatItems[selectedIdx].dbname })}
//             {...rest}
//         >
//             Select
//         </BottomButton>
//     );
// }

export function FldCatDlgBody() {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);

    const inData = useAtomValue(fldCatTriggerAtom);

    const selectedItemAtom = useState(atom<CatalogItem | null>(null))[0];
    const selectedItem = useAtomValue(selectedItemAtom);

    return (
        <div className={classNames(frameClasses, "min-w-[540px]")}>
            {/* <DialogHeader header="Field Catalog" /> */}
            {/* <DialogHeader header={<SubTitle />} /> */}
            <DialogHeader header={<Header />} />

            {/* Body */}
            <div>
                {/* <SubTitle /> */}
                <div className="h-[50vh] min-h-[120px]">
                    <FldCatItemsGrid selectedItemAtom={selectedItemAtom} />
                </div>

                <div className="">{JSON.stringify(selectedItem || {})}</div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-x-2">
                {!!inData
                    ?
                    <BottomButton
                        className={classNames("disabled:opacity-25")}
                        disabled={!selectedItem}
                        onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })}
                    >
                        Select
                    </BottomButton>
                    // <SelectButton selectedIdxAtom={selectedIdxAtom} />
                    :
                    <BottomButton>OK</BottomButton>
                }

                <BottomButton>Cancel</BottomButton>
            </div>
        </div>
    );
}
