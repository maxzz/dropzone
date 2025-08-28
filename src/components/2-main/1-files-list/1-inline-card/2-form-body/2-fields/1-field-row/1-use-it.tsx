import { SymbolFieldUseIt0, SymbolFieldUseIt1 } from "@ui/icons";
import { classNames } from "@/utils";

export function part1_UseIt(useIt: boolean | undefined, fieldIdx: number) {
    const title = `Field index: ${fieldIdx}. Marker to use or not to use this field`;
    const icon = useIt ? SymbolFieldUseIt1 : SymbolFieldUseIt0;

    return icon({
        title,
        className: classNames("ml-0.5 px-0.5 size-3 flex-none", useIt ? "stroke-[#216100] stroke-[3]" : "stroke-[#888]")
    });
}
