import React, { ReactElement, useState } from "react";
import { Dropdown } from "react-overlays";
import DropdownToggle from "./DropdownToggle";
import DropdownMenu from "./DropdownMenu";

import "./style/index.less";

interface LivodDropdownProps {
    children: ReactElement;
    overlay: ReactElement; /* Menu component  */
    placement?: Placement; /* Where the Menu appears */
    trigger?: string; /* Trigger method, click or contextMenu */
}

export type Placement =
    | "up"
    | "upEnd"
    | "down"
    | "downEnd"
    | "left"
    | "leftEnd"
    | "right"
    | "rightEnd";

const convertPlacement = (placement: Placement) => {
    return placement.split(/\B(?=[A-Z])/);
};

const LivodDropdown: React.FC<LivodDropdownProps> = ({
    children,
    overlay,
    placement = "down",
    trigger,
}) => {
    const [drop, alignEnd] = convertPlacement(placement);
    const [show, setShow] = useState(false);
    const onToggle = (nextShow: boolean) => setShow(nextShow);
    return (
        <Dropdown
            show={show}
            onToggle={onToggle}
            drop={drop as any}
            alignEnd={alignEnd === "End" ? true : false}
        >
            {() => (
                <>
                    <DropdownToggle trigger={trigger}>{children}</DropdownToggle>
                    {overlay}
                </>
            )}
        </Dropdown>
    );
};

LivodDropdown.displayName = "Dropdown";
(LivodDropdown as any).Menu = DropdownMenu;
export default LivodDropdown;
