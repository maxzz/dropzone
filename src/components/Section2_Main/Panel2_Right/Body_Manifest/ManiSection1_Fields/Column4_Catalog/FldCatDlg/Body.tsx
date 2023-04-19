import React from "react";
import { DialogButtons, DialogHeader } from "../../../ManiSection3_Policy/PolicyEditorDlg/ui-sections";
import { classNames } from "@/utils";
import { FldCatItemsGrid } from "./FldCatItemsGrid";

const frameClasses = "p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4";
const sectionClasses = "text-sm font-bold border-primary-700 border-b";

export function FldCatDlgBody() {
    return (
        <div className={frameClasses}>
            {/* Header */}
            <DialogHeader header="Field Catalog" />

            <div>
                <h2 className={sectionClasses}>Catalog items</h2>
                
                <div className="max-h-[60vh] min-w-[500px] overflow-y-auto">
                    <FldCatItemsGrid />
                </div>
            </div>

            {/* Buttons */}
            <DialogButtons />
        </div>
    );
}
