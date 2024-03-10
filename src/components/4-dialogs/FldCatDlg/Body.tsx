import { ButtonHTMLAttributes, InputHTMLAttributes, useEffect, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { fldCatItemsAtom, closeFldCatDialogAtom, fldCatTriggerAtom } from "@/store";
import { BottomButton, DialogHeader } from "../../2-main/Panel2_Right/2-file-manifest/3-tab-policy/dlg-policy-editor/ui-sections";
import { FldCatItemsGrid } from "./FldCatItemsGrid";
import { classNames, turnOffAutoComplete } from "@/utils";

const gridFrameClasses = 'p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4';
const dlgHeaderClasses = 'my-1 text-xs font-thin text-primary-400 bg-primary-800';
const subSectionClasses = 'mt-4 pb-0.5 text-sm text-primary-400 bg-primary-800 border-primary-700 border-b';

function SubTitleA() {
    return (
        <div className={subSectionClasses}>
            <div className="flex items-center justify-between">
                <div className="">Catlog items</div>
                <button className="px-2 border border-primary-700/50 rounded">+</button>
            </div>
        </div>
    );
}

function SubTitleB() {
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
        <input className={classNames("px-2 py-1.5 w-full text-primary-300 bg-primary-700 rounded", inputFocusClasses, className,)} {...rest} />
    );
}

function SelectedItemData({ selectedItemAtom }: { selectedItemAtom: PrimitiveAtom<CatalogItem | null>; }) {
    const selectedItem = useAtomValue(selectedItemAtom);

    const nameAtom = useState(atom(selectedItem?.displayname || ''))[0];
    const [localName, setLocalName] = useAtom(nameAtom);

    const valueAtom = useState(atom(selectedItem?.value || ''))[0];
    const [localValue, setLocalValue] = useAtom(valueAtom);

    const typeAtom = useState(atom(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt'))[0];
    const [localType, setLocalType] = useAtom(typeAtom);

    const ownernoteAtom = useState(atom(selectedItem?.ownernote || ''))[0];
    const [ownernote, setOwnernote] = useAtom(ownernoteAtom);

    useEffect(() => {
        setLocalName(selectedItem?.displayname || '');
        setLocalValue(selectedItem?.value || '');
        setLocalType(!selectedItem ? '' : selectedItem?.password ? 'psw' : 'txt');
        setOwnernote(selectedItem?.ownernote || JSON.stringify(selectedItem || {}));
    }, [selectedItem]);

    const itemClasses = "flex flex-col items-start";

    return (
        <div className="mt-2 text-xs grid grid-cols-[min-content_auto_10rem] gap-x-2">

            <div className={itemClasses}>
                <div>Type</div>
                <Input className="w-[3rem]" value={localType} onChange={(e) => setLocalType(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={itemClasses}>
                <div>Name</div>
                <Input value={localName} onChange={(e) => setLocalName(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={itemClasses}>
                <div>Value</div>
                <Input value={localValue} onChange={(e) => setLocalValue(e.target.value)} {...turnOffAutoComplete} />
            </div>

            <div className={`mt-2 col-span-full ${itemClasses}`}>
                <div>Description</div>
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
