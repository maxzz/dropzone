import { Meta } from "@/store/manifest";
import { classNames } from "@/utils";

export function part5_Policy(field: Meta.Field) {
    const { policy } = field.mani;
    const low = !policy;
    return (
        <div className={classNames("row-field-framed", low && "opacity-25")} title={`Field policy: ${policy}`}>
            policy
        </div>
    );
}
