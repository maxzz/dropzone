import React, { ButtonHTMLAttributes, InputHTMLAttributes, useEffect, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { fldCatItemsAtom, closeFldCatDialogAtom, fldCatTriggerAtom, CatalogItem } from "@/store";
import { BottomButton, DialogHeader } from "../../Section2_Main/Panel2_Right/Body_Manifest/ManiSection3_Policy/PolicyEditorDlg/ui-sections";
import { FldCatItemsGrid } from "./FldCatItemsGrid";
import { classNames, turnOffAutoComplete } from "@/utils";

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

const inputHeight28Classes = 'px-2 py-1.5 text-xs'; // h-7
const inputHeight32Classes = 'px-2 py-1.5 text-sm'; // h-8
const inputFocusClasses = "focus:outline-none focus:ring-1 focus:ring-primary-400  focus:ring-offset-1 focus:ring-offset-primary-800";

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames("px-2 py-1.5 text-primary-300 bg-primary-700 rounded", inputFocusClasses, className,)} {...rest} />
    );
}

function SelectedItemData({ selectedItemAtom }: { selectedItemAtom: PrimitiveAtom<CatalogItem | null>; }) {
    const selectedItem = useAtomValue(selectedItemAtom);

    const nameAtom = useState(atom(selectedItem?.dispname || ''))[0];
    const [localName, setLocalName] = useAtom(nameAtom);

    const valueAtom = useState(atom(selectedItem?.value || ''))[0];
    const [localValue, setLocalValue] = useAtom(valueAtom);

    const typeAtom = useState(atom(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt'))[0];
    const [localType, setLocalType] = useAtom(typeAtom);

    const ownernoteAtom = useState(atom(selectedItem?.ownernote || ''))[0];
    const [ownernote, setOwnernote] = useAtom(ownernoteAtom);

    useEffect(() => {
        setLocalName(selectedItem?.dispname || '');
        setLocalValue(selectedItem?.value || '');
        setLocalType(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt');
        setOwnernote(selectedItem?.ownernote || JSON.stringify(selectedItem || {}));
    }, [selectedItem]);

    return (
        <div className="text-xs grid">

            <div className="text-xs flex space-x-2">
                <div className="flex flex-col items-start">
                    <div className="">Type</div>
                    <Input className="w-[3rem]" value={localType} onChange={(e) => setLocalType(e.target.value)} {...turnOffAutoComplete} />
                </div>

                <div className="flex flex-col items-start">
                    <div className="">Name</div>
                    <Input value={localName} onChange={(e) => setLocalName(e.target.value)} {...turnOffAutoComplete} />
                </div>

                <div className="flex flex-col items-start">
                    <div className="">Value</div>
                    <Input value={localValue} onChange={(e) => setLocalValue(e.target.value)} {...turnOffAutoComplete} />
                </div>
            </div>

            <div className="mt-2 flex flex-col items-start">
                <div className="">Description</div>
                <textarea
                    className="p-1 w-full min-h-[3rem] text-[.65rem] leading-3 bg-primary-700 rounded" rows={3}
                    value={ownernote}
                    onChange={(e) => { setOwnernote(e.target.value); }}
                    {...turnOffAutoComplete}
                />
            </div>
        </div>
    );//max-w-[340px]
}

export function FldCatDlgBody() {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    const selectedItemAtom = useState(atom<CatalogItem | null>(null))[0];
    const selectedItem = useAtomValue(selectedItemAtom);

    return (
        <div className={classNames(gridFrameClasses, "w-[540px]")}>
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
                <SelectedItemData selectedItemAtom={selectedItemAtom} />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-x-2">
                {needSelect
                    ? (
                        <>
                            <SelectButton selectedItemAtom={selectedItemAtom} />
                            <BottomButton className={inputFocusClasses}>Cancel</BottomButton>
                        </>
                    )
                    : <BottomButton>Close</BottomButton>
                }
            </div>
        </div>
    );
}
