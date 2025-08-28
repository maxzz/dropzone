import { DefAppTypes } from "./app";
import { DefFieldTypes } from "./field";
import { DefAllOther } from "./all-other";
import { UISymbolDefsInject } from "pm-manifest-icons";

export * from "./app";
export * from "./field";
export * from "./all-other";

export function UISymbolDefs() {
    return (
        <UISymbolDefsInject>
            {DefAppTypes()}
            {DefFieldTypes()}
            {DefAllOther()}
        </UISymbolDefsInject>
    );
}
