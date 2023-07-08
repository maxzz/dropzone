import { IconChevronDown, IconChevronUp, IconDoubleDown } from './UIIconSymbols';

export function UIIconUpDown({ isUp, double = false, className }: { isUp: boolean; double?: boolean; className: string; }) {
    if (double) {
        const component = IconDoubleDown;
        return component({
            className,
            style: {
                transform: `rotateX(${isUp ? '180deg' : '0deg'})`
            }
        });
    } else {
        const component = isUp ? IconChevronUp : IconChevronDown;
        return component({
            className
        });
    }
}
