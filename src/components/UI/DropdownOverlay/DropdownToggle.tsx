import React, { ReactElement, useMemo } from "react";
import { useDropdownToggle } from "react-overlays";

interface DropdownToggleProps {
    children: ReactElement;
    trigger?: string;
}

const DropdownToggle: React.FC<DropdownToggleProps> = ({ children, trigger, }) => {
    const [props, { toggle }] = useDropdownToggle();

    const specifiedToggle = useMemo(() => {
        switch (trigger) {
            case "contextMenu":
                return {
                    onContextMenu: (e: Event) => {
                        toggle(true); //tm: toggle(e);
                        e.preventDefault();
                    },
                };
            default:
                return {
                    onClick: toggle,
                };
        }
    }, [trigger, toggle]);

    return React.cloneElement(children, { ...props, ...specifiedToggle, });
};

export default DropdownToggle;
