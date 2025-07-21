import { type ReactNode } from "react";
import { a, useSpring } from "@react-spring/web";

export function AnimatedDropdown({ isOpen, children }: { isOpen: boolean; children: ReactNode; }) {
    const stylesDropdown = useSpring({
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        config: { duration: 200 },
    });

    return (<>
        {isOpen && (
            <a.div style={stylesDropdown}>
                {children}
            </a.div>
        )}
    </>);
}
