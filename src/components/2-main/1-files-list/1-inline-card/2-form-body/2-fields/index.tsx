import { useAtomValue } from "jotai";
import { FileUsAtomType, SelectRowAtomsType } from "@/store";
import { FieldRow } from "./1-field-row";

type Part2_FormFieldsProps = {
    fileUsAtom: FileUsAtomType;
    formType: number;
    selectRowAtoms: SelectRowAtomsType;
};

export function CardFormBody2_Fields({ fileUsAtom, formType, selectRowAtoms }: Part2_FormFieldsProps) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.parsedSrc.meta?.[formType];
    return (<>
        {metaForm?.fields?.map(
            (field, idx) => (
                <FieldRow fileUs={fileUs} form={metaForm} field={field} selectRowAtoms={selectRowAtoms} key={idx} />
            ))
        }
    </>);
}
