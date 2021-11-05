import React from 'react';
import Dropdown, { Placement } from '../UI/DropdownOverlay';

const Menu = (
    <Dropdown.Menu>
        <Dropdown.Menu.Item>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.alipay.com/"
            >
                1st menu item
            </a>
        </Dropdown.Menu.Item>
    </Dropdown.Menu>
);

const placementArr: Placement[] = [
    "up",
    "upEnd",
    "down",
    "downEnd",
    "left",
    "leftEnd",
    "right",
    "rightEnd",
];

<div>
    {placementArr.map((placement) => {
        return (
            <Dropdown key={placement} overlay={Menu} placement={placement}>
                <button
                    onClick={(e) => e.preventDefault()}
                    style={{ marginLeft: "100px", marginBottom: "10px" }}
                >
                    {placement}
                </button>
            </Dropdown>
        );
    })}
</div>;
