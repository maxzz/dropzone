import { type JSX } from "react";
import { useAtom, useSetAtom } from "jotai";
import { FileUs, SelectRowAtomsType } from "@/store";
import { Meta } from "@/store/manifest";
import { classNames } from "@/utils";
import { part1_UseIt } from "./1-use-it";
import { part2_FieldType } from "./2-field-type";
import { part3_Preview } from "./3-preview";
import { part4_DispText } from "./4-disp-text";
import { part5_Policy } from "./5-policy";
import { part6_Value } from "./6-value";
import { part7_FormCrossrefs } from "./7-form-cross-refs";
import { part8_Id } from "./8-id";
import { part9_Path } from "./9-path";

type FieldRowProps = {
    fileUs: FileUs;
    form: Meta.Form;
    field: Meta.Field;
    selectRowAtoms: SelectRowAtomsType;
};

export function FieldRow({ fileUs, form, field, selectRowAtoms }: FieldRowProps): JSX.Element {
    const { displayname = '', type = 'NOTYPE', rfieldindex, useit, } = field.mani;

    const selectThisFormAtom = form.type === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom;
    const selectThemFormAtom = form.type === 0 ? selectRowAtoms.cpassAtom : selectRowAtoms.loginAtom;
    const [selectedRowThis, setSelectedRowThis] = useAtom(selectThisFormAtom);
    const setSelectedRowThem = useSetAtom(selectThemFormAtom);

    const hasPreview = !!field.path.loc;
    const hasPath = !!Object.keys(field.path).length;

    const isSelected = form.view?.rects.length && field.previewIdx === selectedRowThis.fieldIdx;

    function selectRow() {
        if (form.type === 1 /*Mani.FORMNAME.pchange*/ && form.previewOther) {
            setSelectedRowThem({ fieldIdx: rfieldindex && form.previewOther[rfieldindex] || -1, formType: 0 });
        }

        setSelectedRowThis({ fieldIdx: isSelected ? -1 : field.previewIdx, formType: form.type });
    }

    return (
        <div
            className={classNames("flex items-center text-xs h-6 space-x-1 overflow-hidden", useit && 'bg-[#bbffdf42]', isSelected && '!bg-blue-200')}
            onClick={selectRow}
        >
            {/* 1. use it */}
            {part1_UseIt(useit, field.pidx)}

            {/* 2. icon and text for field type */}
            {part2_FieldType(type, field)}

            {/* 3. icon preview and preview */}
            {part3_Preview(hasPreview, form, field, setSelectedRowThis)}

            {/* 4. display text */}
            {part4_DispText(useit, type, displayname)}

            {/* 5. policy */}
            {part5_Policy(field)}

            {/* 6. value */}
            {part6_Value(field)}

            {/* 7. ref */}
            {part7_FormCrossrefs(field)}

            {/* 8. id */}
            {part8_Id(field)}

            {/* 9. path */}
            {part9_Path(hasPath, fileUs, form, field)}

            {/* 10.done */}
        </div>
    );
}

//TODO: policy field
//TODO: rfield (in out), rfieldrindex
//TODO: refs @email

//TODO: script
//TODO: 'path_ext' and ignore 'path' but complain about 'path'

//TODO: avoid extra div around SVGs; set size on icon
