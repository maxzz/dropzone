import { SymbolChevronDown, SymbolChevronUp, SymbolDoubleDown } from "./symbols";

export function UIIconUpDown({ isOpen, horizontal = false, double = false, className }: { isOpen: boolean; horizontal?: boolean; double?: boolean; className?: string; }) {
    if (double) {
        const component = SymbolDoubleDown;
        const rotation =
            horizontal
                ? isOpen
                    ? 'rotateZ(0deg)'
                    : 'rotateZ(-90deg)'
                : isOpen
                    ? 'rotateX(180deg)'
                    : 'rotateX(0deg)'
            ;
        return component({
            className,
            style: {
                transform: rotation
            }
        });
    } else {
        const component = isOpen ? SymbolChevronUp : SymbolChevronDown;
        const rotation =
            horizontal
                ? isOpen
                    ? 'rotateZ(180deg)'
                    : 'rotateZ(-90deg)'
                : 'rotateX(0deg)'
            ;
        return component({
            className,
            style: {
                transform: rotation
            }
        });
    }
}
