import { PrimitiveAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { BottomButton } from "@/components/2-main/2-right/2-file-manifest/3-tab-policy/dlg-policy-editor/3-sections";
import { inputFocusClasses } from "./4-selected-item-body";
import { SelectButton } from "./6-select-button";

type BottomButtonsProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    showSelectBtn: boolean;
};

export function BottomButtons({ selectedItemAtom, showSelectBtn }: BottomButtonsProps) {
    return (
        <div className="pt-4 flex items-center justify-end gap-x-2">
            {showSelectBtn && (
                <SelectButton selectedItemAtom={selectedItemAtom} />
            )}

            <BottomButton className={inputFocusClasses}>
                {showSelectBtn ? 'Cancel' : 'Close'}
            </BottomButton>
        </div>
    );
}
