import React from "react";
import { useAtom } from "jotai";
import { Atomize } from "@/hooks/atomsX";
import { Check } from "../../../ManiSection3_Policy/PolicyEditorDlg/ui-controls";
import { DialogButtons, DialogHeader, SectionGenerationBy, SectionHistory, SectionMinMaxLength, SectionRuleTypes, SectionTestRoom } from "../../../ManiSection3_Policy/PolicyEditorDlg/ui-sections";
import { classNames } from "@/utils";

const frameClasses = "p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4";
const sectionClasses = "text-sm font-bold border-primary-700 border-b";

export function FldCatDlgBody() {
    return (
        <div className={frameClasses}>
            {/* Header */}
            <DialogHeader header="Field Catalog" />

            <div className={classNames("flex flex-col space-y-4")}>
                {/* Predefined or Custom rule */}
                <h2 className={sectionClasses}>Catalog items</h2>
                <div className="">something</div>
            </div>

            {/* Buttons */}
            <DialogButtons />
        </div>
    );
}
