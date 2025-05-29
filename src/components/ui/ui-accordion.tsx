import React, { ReactNode, useEffect, useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { disableHiddenChildren } from '@/utils/disable-hidden-children';

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refMeasure, { height, top }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();
    const [firstRun, setFirstRun] = React.useState(true);

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        }
    }, [firstRun]);

    const animation = useSpring({
        height: open ? height + top : 0,
        ena: disableHiddenChildren(open, refElm),
        config: firstRun ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
        onRest: () => firstRun && setFirstRun(false),
    });

    return (
        <a.div style={animation} className="overflow-y-hidden smallscroll">
            <div ref={(el) => { el && (setElm(el), refMeasure(el)); }}>
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
