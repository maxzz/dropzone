import { fieldIcons } from "@/store/manifest/manifest-field-icons";

export function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, });
    const rv = icon || (
        <div className="text-red-500">nan</div>
    );
    return rv;
}
