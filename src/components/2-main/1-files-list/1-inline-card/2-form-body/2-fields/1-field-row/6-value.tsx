import { type Meta } from "@/store/manifest";
import { classNames } from "@/utils";

export function part6_Value(field: Meta.Field) {
    const { value, choosevalue } = field.mani;
    const title = `Field value: ${value}${choosevalue ? ` | Choices: ${choosevalue}` : ''}`;
    const low = !value;
    return (
        <div className={classNames("row-field-framed", low && "opacity-25")} title={title}>
            value
        </div>
    );
}
