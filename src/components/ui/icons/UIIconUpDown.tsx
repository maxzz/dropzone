import { SymbolChevronDown, SymbolChevronUp, SymbolDoubleDown } from "./symbols";

export function UIIconUpDown({ isUp, double = false, className }: { isUp: boolean; double?: boolean; className: string; }) {
    if (double) {
        const component = SymbolDoubleDown;
        return component({
            className,
            style: {
                transform: `rotateX(${isUp ? '180deg' : '0deg'})`
            }
        });
    } else {
        const component = isUp ? SymbolChevronUp : SymbolChevronDown;
        return component({
            className
        });
    }
}
