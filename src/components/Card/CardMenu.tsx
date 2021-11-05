import React from 'react';
import Dropdown, { Placement } from '../UI/DropdownOverlay';

const Menu = () => {
    return (
        <Dropdown.Menu>
            <Dropdown.Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
                </a>
            </Dropdown.Menu.Item>
        </Dropdown.Menu>
    );
};

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

function CardMenu() {
    return (
        <div>
            {placementArr.map((placement) => {
                return (
                    <Dropdown key={placement} overlay={<Menu />} placement={placement}>
                        <button style={{ marginLeft: "100px", marginBottom: "10px" }} onClick={(e) => e.preventDefault()}>
                            {placement}
                        </button>
                    </Dropdown>
                );
            })}
        </div>
    );
}

export default CardMenu;
