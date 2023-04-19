import React from "react";
import { useAtom } from "jotai";
import { Atomize } from "@/hooks/atomsX";
import { Check } from "./ui-controls";
import { DialogButtons, DialogHeader, SectionGenerationBy, SectionHistory, SectionMinMaxLength, SectionRuleTypes, SectionTestRoom } from "./ui-sections";
import { classNames } from "@/utils";
import { PolicyUi } from ".";

const frameClasses = "p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4";
const sectionClasses = "text-sm font-bold border-primary-700 border-b";

export function PolicyEditorBody({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [enabled, setEnabled] = useAtom(atoms.enabledAtom);
    return (
        <div className={frameClasses}>
            {/* Header */}
            <DialogHeader header="Policy Editor" subHeader="Specify password complexity, history and generation requirements." />

            <Check checked={enabled} onChange={() => setEnabled(v => !v)}>
                Enable password policy
            </Check>

            <div className={classNames("flex flex-col space-y-4", !enabled && "opacity-10 pointer-events-none")}>
                {/* Predefined or Custom rule */}
                <h2 className={sectionClasses}>Password complexity</h2>
                <SectionRuleTypes atoms={atoms} />

                {/* Min / Max length */}
                <SectionMinMaxLength atoms={atoms} />

                {/* Test section */}
                <h2 className={sectionClasses}>Test password complexity</h2>
                <SectionTestRoom atoms={atoms} />

                {/* History */}
                <h2 className={sectionClasses}>Password history restrictions</h2>
                <SectionHistory atoms={atoms} />

                {/* Generation */}
                <h2 className={sectionClasses}>Password generation</h2>
                <SectionGenerationBy atoms={atoms} />
            </div>

            {/* Buttons */}
            <DialogButtons />
        </div>
    );
}
