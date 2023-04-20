import React from "react";
import { useSetAtom } from "jotai";
import { FileUsAtomType, formEditorDataAtom } from "@/store";
import { IconGear } from "@ui/icons";

export function BtnEdit({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: number; }) {
    const setFormEditorData = useSetAtom(formEditorDataAtom);
    return (
        <button
            className={`px-1 h-6 card-header-btn__edit`}
            onClick={() => setFormEditorData({ fileUsAtom, formIdx: formIdx })}
            title="Edit detection options"
        >
            <IconGear className="w-4 h-4 stroke-[1.2]" />
        </button>
    );
}
