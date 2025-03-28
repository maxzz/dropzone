import { type PrimitiveAtom, useSetAtom } from "jotai";
import { type CatalogItem } from "@/store/manifest";
import { closeFldCatDialogAtom } from "@/store";
import { FldCatItemsGrid } from "../2-items-grid";
import { SelectedItemBody } from "./4-selected-item-body";

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

type MiddleBodyProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
};

export function MiddleBody({ selectedItemAtom }: MiddleBodyProps) {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);
    return (
        <div>
            <SubTitleA />
            <div className="h-[50vh] min-h-[120px]">
                <FldCatItemsGrid
                    selectedItemAtom={selectedItemAtom}
                    onDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
                />
            </div>

            <SubTitleB />
            <SelectedItemBody selectedItemAtom={selectedItemAtom} />
        </div>
    );
}
