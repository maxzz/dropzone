import React from 'react';
import { styled } from '../stitches.config';
import * as SwitchPrimitive from '@radix-ui/react-switch';

const blackA = {
    blackA7: '#00000080',
    blackA9: 'red',
};

const StyledSwitch = styled(SwitchPrimitive.Root, {
    //all: 'unset',
    // width: 42,
    // height: 25,
    //backgroundColor: blackA.blackA9,
    //borderRadius: '9999px',
    //position: 'relative',
    //boxShadow: `0 2px 10px ${blackA.blackA7}`,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    //'&:focus': { boxShadow: `0 0 0 2px black` },
    '&[data-state="checked"]': { backgroundColor: 'rgb(156, 163, 175)' }, //bg-gray-400
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
    display: 'block',
    // width: 21,
    // height: 21,
    backgroundColor: 'white',
    borderRadius: '9999px',
    boxShadow: `0 2px 2px ${blackA.blackA7}`,
    transition: 'transform 100ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(100%)' },
    // '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

// Exports
const Switch = StyledSwitch;
const SwitchThumb = StyledThumb;

// Your app...
// const Flex = styled('div', { display: 'flex' });
// const Label = styled('label', {
//     color: 'white',
//     fontSize: 15,
//     lineHeight: 1,
//     userSelect: 'none',
// });

// const LabeledSwitch = () => (
//     <Flex css={{ alignItems: 'center' }}>
//         <Label htmlFor="s1" css={{ paddingRight: 15 }}>
//             Auto
//         </Label>
//         <Switch defaultChecked id="s1">
//             <SwitchThumb />
//         </Switch>
//     </Flex>
// );
//#7b899d

function LabeledSwitch({ label, value, onChange }: { label: React.ReactNode; value: boolean; onChange: () => void; }) {
    return (
        <label className="flex items-center select-none">
            {label}
            <Switch
                className="ml-2 w-[46px] h-[28px] flex items-center bg-gray-700 rounded-full relative shadow border-2 ring-gray-400 focus:ring-gray-900"
                checked={value}
                onChange={onChange}
            >
                {/* <Switch className="ml-2 w-[42px] h-6 flex items-center bg-gray-700 rounded-full relative shadow ring-2 ring-gray-400 focus:ring-gray-900"> */}
                <SwitchThumb className="mb-px w-5 h-5" />
            </Switch>
        </label>
    );
}

export default LabeledSwitch;
