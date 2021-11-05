import React, { ReactNode } from "react";
import DropdownMenu from "react-overlays/DropdownMenu";
import { useDropdownToggle } from "react-overlays";

interface LivodDropdownMenuProps {
    children: ReactNode | ReactNode[];
}

interface LivodDropdownMenuItemProps {
    children: ReactNode | ReactNode[];
    danger?: boolean;
    onClick?: (e: React.MouseEvent) => any;
}

export type Menu = typeof LivodDropdownMenu & {
    Item: typeof LivodDropdownMenuItem;
};

const LivodDropdownMenu: React.FC<LivodDropdownMenuProps> = ({ children }) => {
    return (
        <DropdownMenu>
            {(props) => (
                <ul {...props.props} className="livod-dropdown-menu">
                    {children}
                </ul>
            )}
        </DropdownMenu>
    );
};

const LivodDropdownMenuItem: React.FC<LivodDropdownMenuItemProps> = ({
    children,
    danger,
    onClick,
}) => {
    const [, { toggle }] = useDropdownToggle();
    const close = (event: React.MouseEvent) => {
        onClick && onClick(event);
        toggle(false);
    };
    return (
        <li
            onClick={close}
            className={"livod-dropdown-menu-item" + (danger ? " danger" : "")}
        >
            {children}
        </li>
    );
};

const Menu: Menu = LivodDropdownMenu as Menu;

Menu.Item = LivodDropdownMenuItem;

export default Menu;
