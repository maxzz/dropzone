import React, { ButtonHTMLAttributes, useState } from "react";
import { PrimitiveAtom, atom, useAtomValue, useSetAtom } from "jotai";
import { fldCatItemsAtom, closeFldCatDialogAtom, fldCatTriggerAtom, CatalogItem } from "@/store";
import { BottomButton, DialogHeader } from "../../Section2_Main/Panel2_Right/Body_Manifest/ManiSection3_Policy/PolicyEditorDlg/ui-sections";
import { FldCatItemsGrid } from "./FldCatItemsGrid";
import { classNames } from "@/utils";

const gridFrameClasses = 'p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4';
const dlgHeaderClasses = 'my-1 text-xs font-thin text-primary-400 bg-primary-800';
const subSectionClasses = 'mt-4 pb-1 text-xs text-primary-400 bg-primary-800 border-primary-700 border-b';

function SubTitleA() {
    const totalItems = useAtomValue(fldCatItemsAtom).length;
    return (
        <div className={subSectionClasses}>
            Catlog items
        </div>
    );
}

function SubTitleB() {
    const totalItems = useAtomValue(fldCatItemsAtom).length;
    return (
        <div className={subSectionClasses}>
            Selected item
        </div>
    );
}

function Header() {
    const totalItems = useAtomValue(fldCatItemsAtom).length;
    return (
        <div className="pr-1 flex items-center justify-between">
            <div>Field Catalog</div>
            <div className={dlgHeaderClasses}>({totalItems} item{totalItems === 1 ? '' : 's'})</div>
        </div>
    );
}

export function SelectButton({ selectedItemAtom, ...rest }: { selectedItemAtom: PrimitiveAtom<CatalogItem | null>; } & ButtonHTMLAttributes<HTMLButtonElement>) {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);
    const selectedItem = useAtomValue(selectedItemAtom);
    return (
        <BottomButton disabled={!selectedItem} onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })} {...rest}>
            Select
        </BottomButton>
    );
}

export function FldCatDlgBody() {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    const selectedItemAtom = useState(atom<CatalogItem | null>(null))[0];
    const selectedItem = useAtomValue(selectedItemAtom);

    return (
        <div className={classNames(gridFrameClasses, "min-w-[540px]")}>
            {/* <DialogHeader header="Field Catalog" /> */}
            {/* <DialogHeader header={<SubTitle />} /> */}
            <DialogHeader header={<Header />} />

            {/* Body */}
            <div>
                <SubTitleA />
                <div className="h-[50vh] min-h-[120px]">
                    <FldCatItemsGrid
                        selectedItemAtom={selectedItemAtom}
                        onDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
                    />
                </div>

                <SubTitleB />
                <div className="max-w-[340px] h-32">{JSON.stringify(selectedItem || {})}</div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-x-2">
                {needSelect
                    ? (
                        <>
                            <SelectButton selectedItemAtom={selectedItemAtom} />
                            <BottomButton>Cancel</BottomButton>
                        </>
                    )
                    : <BottomButton>Close</BottomButton>
                }
            </div>
        </div>
    );
}
