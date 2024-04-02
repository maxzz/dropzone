import React from 'react';
import { useAtomValue } from "jotai";
import { busyAtom } from "@/store";
import { useSpring, a } from "@react-spring/web";
import { keyframes } from "@stitches/react";
import { IconRocket } from "@ui/icons";

const rocketAnimation = keyframes({
    '0%': { transform: 'scale(1) translateY(0px)', opacity: 1 },
    '25%': { transform: 'scale(.7) translateY(-2px)', opacity: 0 },
    '50%': { transform: 'scale(1) translateY(2px)', opacity: 0.5 },
    '70%': { transform: 'scale(.8) translateY(0px)', opacity: 0.7 },
});

export function BusyIndicator() {
    const busyText = useAtomValue(busyAtom);
    const styles = useSpring({ opacity: busyText ? 1 : 0, config: { duration: 1250 } });
    return (
        <a.div style={styles} className="grid md:flex md:space-x-1">
            {/* Busy icon animation */}
            <IconRocket
                className="ml-2 size-5 -mt-6 md:mt-0"
                style={{ animation: busyText ? `${rocketAnimation} 1.2s infinite` : '' }}
            />
            {/* Busy explanation text */}
            <div
                className={`text-xs text-green-400 rotate-90 ${busyText ? 'translate-x-[-3px]' : ''} translate-y-5 md:translate-x-0 md:translate-y-0 md:rotate-0`}
                style={{ transition: 'opacity 1.2s 1s' }}
            >
                {busyText}
            </div>
        </a.div>
    );
}
