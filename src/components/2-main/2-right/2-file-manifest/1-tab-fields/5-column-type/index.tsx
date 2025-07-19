import { InputHTMLAttributes } from "react";
import { PrimitiveAtom as PA, useAtomValue } from "jotai";
import { Meta } from "@/store/manifest";
import { classNames } from "@/utils";
import { FieldTypeIconComponent, fieldTypeTitle } from "@/store/manifest/manifest-field-icons";

type Column5_TypeProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PA<boolean>;
    field: Meta.Field;
};

const column5_TypeClasses = "text-[.55rem] text-primary-500 flex items-center space-x-0.5 select-none";

export function Column5_Type({ useItAtom, field, className, ...rest }: Column5_TypeProps) {
    const useIt = useAtomValue(useItAtom);
    const { password, type = 'NOTYPE' } = field.mani;
    const title = fieldTypeTitle(field.mani);
    return (
        <div className={classNames(column5_TypeClasses, !useIt && "opacity-30 cursor-pointer", className)} title={title} {...rest}>
            <FieldTypeIconComponent field={field.mani} className="size-5" />

            <div>
                {`${password ? 'psw' : type}`}
            </div>
        </div>
    );
}
