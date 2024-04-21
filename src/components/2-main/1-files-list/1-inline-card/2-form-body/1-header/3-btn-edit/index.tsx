import { useSetAtom } from "jotai";
import { FileUsAtomType, dialogManiEditorDataAtom } from "@/store";
import { SymbolGear } from "@ui/icons";

export function BtnEdit({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: number; }) {
    const setFormEditorData = useSetAtom(dialogManiEditorDataAtom);
    return (
        <button
            className={`px-1 h-6 card-header-btn__edit`}
            onClick={() => setFormEditorData({ fileUsAtom, formIdx: formIdx })}
            title="Edit detection options"
        >
            <SymbolGear className="size-4 stroke-[1.2]" />
        </button>
    );
}
