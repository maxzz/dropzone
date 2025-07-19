import { FieldTyp, Mani, Meta } from "@/store/manifest";
import { FieldTypeIconComponent, fieldTypeTitle } from "@/store/manifest/manifest-field-icons";

export function part2_FieldType(type: Mani.FieldTypeStr | 'NOTYPE', field: Meta.Field) {
    const shortTitle = field.ftyp === FieldTyp.psw ? 'psw' : type;
    const title = fieldTypeTitle(field.mani);
    return (<>
        <FieldTypeIconComponent className="size-5 flex-none" field={field.mani} title={title} />

        <div className="w-11 text-[0.6rem] flex-shrink-0" title={`Field type: ${shortTitle}`}>
            {`${shortTitle}`}
        </div>
    </>);
}
