import React from 'react';
import { Dropdown, useDropdownMenu, useDropdownToggle } from "react-overlays";
import { DropdownProps } from 'react-overlays/cjs/Dropdown';

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

const Toggle = ({ children }: { children: React.ReactNode; }) => {
    const [props] = useDropdownToggle();
    return (
        <button className="" {...props}>
            {children}
        </button>
    );
};

function DropdownButton({
    show,
    onToggle,
    drop,
    alignEnd,
    title,
    role = 'menu',
}: Partial<DropdownProps> & { title: string; role?: string; }) {
    const [toggleProps] = useDropdownToggle();
    return (
        <Dropdown show={show} onToggle={onToggle!} drop={drop} alignEnd={alignEnd} itemSelector="button:not(:disabled)">
            <span>
                <br />
                <button className="" {...toggleProps}>
                    {title}
                </button>

                <Toggle>{title}</Toggle>

                <Menu role={role} />
            </span>
        </Dropdown>
    );
}

function CardMenuOverlays() {
    const [show, setShow] = React.useState(false);
    return (
        <div className="">
            <DropdownButton show={show} onToggle={(nextShow) => setShow(nextShow)} role="menu" title={`${show ? 'Close' : 'Open'}`} />
        </div>
    );
}

export default CardMenuOverlays;
