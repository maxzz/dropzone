import React from 'react';
import { useDropdownMenu } from "react-overlays";

const MenuItem = ({ children }: { children: React.ReactNode; }) => (
    <div className="">
        {children}
    </div>
);

const NavMenu = () => {
    const [props, meta] = useDropdownMenu();
    console.log({ props, meta });

    return (
        <div className="w-32 inline-block bg-white border rounded shadow" role="menu" {...props}>
            <MenuItem>Home</MenuItem>
            <MenuItem>Docs</MenuItem>
            <MenuItem>About</MenuItem>
        </div>
    );
};

function CardMenu() {
    return (
        <div className="relative">
            btn
            <NavMenu />
        </div>
    );
}

export default CardMenu;
