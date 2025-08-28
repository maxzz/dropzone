import { classNames } from "@/utils";
import { type FileUs } from "@/store";
import { type Meta } from "@/store/manifest";
import { FieldRowPath } from "../2-field-path-popup";
import { UIToggleWithPortal } from "../../../4-ui/1-toggle-with-portal";

export function part9_Path(hasPath: boolean, fileUs: FileUs, form: Meta.Form, field: Meta.Field) {
    const { path_ext } = field.mani;
    return (
        <UIToggleWithPortal title={hasPath ? path_ext : 'no path'}
            toggle={<>path</>}
            className={classNames("row-field-framed", !hasPath && 'text-red-500 opacity-50')}
        >
            {/* Popup content */}
            {hasPath
                ? (
                    <FieldRowPath field={field} />
                )
                : (
                    <div className="px-2 py-1 text-xs text-red-500 bg-primary-100 border-primary-400 border">
                        This field has no path and cannot be used.
                    </div>
                )
            }
        </UIToggleWithPortal>
    );
}
