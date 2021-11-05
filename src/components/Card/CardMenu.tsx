import React from 'react';
import { Dropdown, useDropdownMenu, useDropdownToggle } from "react-overlays";
import { DropdownProps } from 'react-overlays/cjs/Dropdown';
import styled from 'styled-components';

const Menu = ({ role }: { role: string; }) => {
    const [props, { toggle = () => { }, show }] = useDropdownMenu({ flip: true, offset: [0, 8], });
    const display = show ? "flex" : "none";
    return (
        <div
            {...props}
            role={role}
            className={`${display} w-48 py-2 flex-col shadow-lg border-gray-200 bg-white z-10 rounded`}
        >
            <button
                type="button"
                onClick={() => toggle(false)}
                className="text-left hover:bg-brand-100 px-6 py-2"
            >
                Item 1
            </button>
            <button
                type="button"
                onClick={() => toggle(false)}
                className="text-left hover:bg-brand-100 px-6 py-2"
            >
                Item 2
            </button>
        </div>
    );
};

const Toggle = ({ id, children }: { id: string, children: React.ReactNode; }) => {
    const [props, { show, toggle }] = useDropdownToggle();
    return (
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
}: Omit<DropdownProps, 'children'> & { title: string; role?: string; }) => (
    <Dropdown
        show={show}
        onToggle={onToggle}
        drop={drop}
        alignEnd={alignEnd}
        itemSelector="button:not(:disabled)"
    >
        <span>
            <Toggle id="example-toggle">{title}</Toggle>
            <Menu role={role} />
        </span>
    </Dropdown>
);

const ButtonToolbar = styled("div")`
    & > * + * {
      margin-left: 12px;
    }
  `;

function DropdownExample() {
    const [show, setShow] = React.useState(false);

    return (
        <ButtonToolbar className="dropdown-example">
            <DropdownButton show={show} onToggle={(nextShow) => setShow(nextShow)} title={`${show ? "Close" : "Open"} Dropdown`}/>
            <DropdownButton alignEnd title="Align right" />

            <DropdownButton drop="up" title="Drop up" />
            <DropdownButton role="menu" title="Role 'menu'" />
        </ButtonToolbar>
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
