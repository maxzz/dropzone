import { useAtomValue } from "jotai";
import { FileUsAtomType } from "@/store";
import { Mani } from "@/store/manifest";
import { ToggleWithPortal } from "../4-shared-ui/2-toggle-w-portal";
import { UITableFromObject } from "../../../4-ui/2-table-from-object";
import { filterDetection } from "./1-filter-detection";

export function BtnPopupDetection({ fileUsAtom, formType }: { fileUsAtom: FileUsAtomType; formType: number; }) {
    const fileUs = useAtomValue(fileUsAtom);

    const form = fileUs.parsedSrc.mani?.forms[formType];
    const toShowDetection = filterDetection(form?.detection || {});
    const toShowOptions = filterUnwantedOptions(form?.options || {});

    return (
        <ToggleWithPortal text="detection">

            {/* Popup content */}
            <div className="mt-1 p-4 text-xs bg-gray-100 ring-1 ring-gray-400 rounded shadow-2xl">

                <div className="px-2 py-1 font-bold">
                    summary
                </div>

                <div className="px-2 w-96 max-w-sm max-h-[40vh] overflow-auto border-t border-b border-gray-400">
                    <UITableFromObject obj={toShowDetection} />
                    <UITableFromObject obj={toShowOptions} />
                </div>

            </div>
        </ToggleWithPortal>
    );
}

function filterUnwantedOptions(options: Mani.Options) {
    let { usequicklink, ...rest } = options;
    return {
        ...rest,
    };
}
