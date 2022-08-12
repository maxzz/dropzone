import React from "react";
import { useSetAtom } from "jotai";
import { FileUsAtomType, formEditorDataAtom } from "@/store";
import { IconGear } from "@ui/UIIconSymbols";
import { BtnShading } from "./HeaderButton";

export function BtnEdit({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: number; }) {
    const setFormEditorData = useSetAtom(formEditorDataAtom);
    return (
        <div
            className={`px-1 h-6 flex items-center justify-center border border-gray-500 rounded active:scale-[.97]`}
            onClick={() => setFormEditorData({ fileUsAtom, formIdx: formIdx })}
            title="Edit detection options"
            style={BtnShading}
        >
            <IconGear className="w-4 h-4 stroke-[1.2]" />
        </div>
    );
}
