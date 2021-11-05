import React from 'react';
import { Dropdown, useDropdownMenu, useDropdownToggle } from "react-overlays";
import { DropdownProps } from 'react-overlays/cjs/Dropdown';
//import styled from 'styled-components';

const Menu = ({ role }: { role: string; }) => {
    const [props, { toggle = () => { }, show }] = useDropdownMenu({ flip: true, offset: [0, 8], });
    const display = show ? "flex" : "none";
    return (
        <div className={`${display} w-48 py-2 flex-col shadow-lg border-gray-200 bg-white z-10 rounded`} role={role} {...props}>
            <button className="text-left focus:bg-blue-300 hover:bg-gray-300 px-6 py-2" onClick={() => toggle(false)}>
                Item 1
            </button>
            <button className="text-left focus:bg-blue-300 hover:bg-gray-300 px-6 py-2" onClick={() => toggle(false)}>
                Item 2
            </button>
        </div>
    );
};

const Toggle = ({ id, children }: { id: string, children: React.ReactNode; }) => {
    const [props, { show, toggle }] = useDropdownToggle();
    return (
        // <button type="button" className="btn" {...props}>
        <button type="button" className="btn" id={id} {...props}>
            {children}
        </button>
    );
};

const DropdownButton = ({
    show,
    onToggle,
    drop,
    alignEnd,
    title,
    role = 'menu',
}: Partial<DropdownProps> & { title: string; role?: string; }) => (
    <Dropdown show={show} onToggle={onToggle!} drop={drop} alignEnd={alignEnd} itemSelector="button:not(:disabled)">
        <span>
            <Toggle id={`example-toggle-${title}`}>{title}</Toggle>
            <Menu role={role} />
        </span>
    </Dropdown>
);

// const ButtonToolbar = styled("div")`
//     & > * + * {
//       margin-left: 12px;
//     }
//   `;

function DropdownExample() {
    const [show, setShow] = React.useState(false);

    return (
        <div className="space-x-2">
            <DropdownButton show={show} onToggle={(nextShow) => setShow(nextShow)} title={`${show ? "Close" : "Open"} Dropdown`} />
            <DropdownButton alignEnd title="Align right" />

            <DropdownButton drop="up" title="Drop up" />
            <DropdownButton role="menu" title="Role 'menu'" />
        </div>
    );
}

function CardMenu() {
    return (
        <div className="relative">
            btn
            <DropdownExample />
        </div>
    );
}

export default CardMenu;
