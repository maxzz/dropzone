import React, { ReactNode, useState } from 'react';
import { useMeasure } from 'react-use';
import { a, config, useSpring } from '@react-spring/web';
import { disableHiddenChildren } from '@/utils/disableHiddenChildren';

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refFn, { height, top }] = useMeasure<HTMLDivElement>();
    const [refEl, setEl] = useState<HTMLDivElement>();
    const [firstRun, setFirstRun] = React.useState(true);
    const animation = useSpring({
        height: open ? height + top : 0,
        ena: disableHiddenChildren(open, refEl),
        config: firstRun ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
        onRest: () => firstRun && setFirstRun(false),
    });
    return (
        <a.div style={animation} className="overflow-y-hidden smallscroll">
            <div ref={(el) => { el && (setEl(el), refFn(el)); }}>
                {children}
            </div>
        </a.div>
    );
}

// export function AccordionHorizontal({ toggle, children }: { toggle: boolean, children: React.ReactNode; }) {
//     const [ref, { width, left }] = useMeasure<HTMLDivElement>();
//     const [firstRun, setFirstRun] = React.useState(true);
//     const animation = useSpring({
//         overflow: "hidden",
//         width: toggle ? width + left : '300px',
//         config: firstRun ? { duration: 0 } : { mass: 0.2, tension: 392, clamp: true, duration: 3000 },
//         onRest: () => firstRun && setFirstRun(false),
//     });
//     return (
//         <div>
//             <a.div style={animation}>
//                 <div ref={ref}>
//                     {children}
//                 </div>
//             </a.div>
//         </div>
//     );
// }

// export function CanvasControlsPanel() {
//     const [showGrid] = useAtom(showGridAtom);
//     return (
//         <div className="absolute bottom-4 right-4 px-2 py-2 bg-slate-400/40 rounded flex items-center space-x-2">
//             {/* <AccordionHorizontal toggle={showGrid}>
//                 <div className=""> */}
//             {showGrid && <Button label="Ticks" atom={showTicksAtom} />}
//             <Button label="Grid" atom={showGridAtom} />
//             {/* </div>
//             </AccordionHorizontal> */}
//         </div>
//     );
// }
// const CanvasControlsPanelMemo = React.memo(CanvasControlsPanel);
