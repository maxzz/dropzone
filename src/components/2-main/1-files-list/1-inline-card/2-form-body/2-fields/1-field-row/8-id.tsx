import { Meta } from "@/store/manifest";

export function part8_Id(field: Meta.Field) {
    const { dbname } = field.mani;
    return (
        <div className="row-field-framed" title={`Value ID: ${dbname}`}>
            id
        </div>
    );
}
