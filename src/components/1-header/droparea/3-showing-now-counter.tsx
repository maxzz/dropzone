import { useAtomValue } from "jotai";
import { filesAtom, filteredAtom } from "@/store";
import { plural } from "@/utils";

export function ShowingNowCounter() {
    const totalFiles = useAtomValue(filesAtom).length;
    const totalFiltered = useAtomValue(filteredAtom).length;
    return (<>
        {totalFiles !== totalFiltered && (
            <div
                className="absolute -right-3 -bottom-1 px-1 text-[.65rem] bg-gray-600 rounded"
                title={`Showing now ${totalFiltered} file${plural(totalFiltered)}`}
            >
                {totalFiltered}
            </div>
        )}
    </>);
}
