import React from 'react';
import { useClickAway } from '../../../hooks/useElementClickAway';
import UIUpDownIcon from '../../UI/UIUpDownIcon';
import { BtnShading } from '../Form/FormOptions';

function UIButtonWithChildren({ name, children, toggle }: { name: string | undefined; children: React.ReactNode; toggle?: React.ReactNode; }) {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    useClickAway(containerRef, (event) => event.target !== containerRef.current && !buttonRef.current?.contains(event.target as HTMLElement) && setOpen(false));

    if (!name) {
        return null;
    }
    return (
        <>
            {toggle
                ? <button ref={buttonRef} onClick={() => setOpen((v) => !v)} >
                    {toggle}
                </button>

                : <button
                    ref={buttonRef}
                    className={`pl-2 pr-1 h-6 leading-6 inline-block text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} flex items-center justify-between`}
                    onClick={() => setOpen((v) => !v)}
                    style={BtnShading}
                >
                    <div className="">
                        {name}
                    </div>

                    <UIUpDownIcon open={open} className="list-owner w-4 h-4 pt-0.5" />
                </button>
            }

            {/* <button
                ref={buttonRef}
                className={`pl-2 pr-1 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} flex items-center`}
                onClick={() => setOpen((v) => !v)}
            >
                <div className="pb-1 mr-1">{name}</div>
                {open ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="list-owner w-4 h-4" />}
            </button> */}
            {open &&
                <div ref={containerRef} className="absolute top-[32px] left-0 right-0 z-10 px-2 border border-gray-500 rounded bg-gray-300 text-xs">
                    {children}
                </div>
            }
        </>
    );
}

export default UIButtonWithChildren;

//import { useClientRect } from '../../hooks/useClientRect';

// function ButtonWithChildrenPortal({ name, children, toggle }: { name: string | undefined; children: React.ReactNode; toggle?: React.ReactNode; }) {
//     const [open, setOpen] = React.useState(false);
//     const containerRef = React.useRef<HTMLDivElement>(null);
//     const buttonRef = React.useRef<HTMLButtonElement | null>(null);
//     const [buttonPosRef, rect] = useClientRect<HTMLDivElement>();

//     const posStyles = rect ? {
//         left: rect.x,
//         top: rect.y + rect.height + 4,
//     } : {};

//     useClickAway(containerRef, (event) => event.target !== containerRef.current && !buttonRef.current?.contains(event.target as HTMLElement) && setOpen(false));

//     if (!name) {
//         return null;
//     }
//     return (
//         <>
//             <div ref={buttonPosRef} className="flex items-center">
//                 {toggle
//                     ? <button ref={buttonRef} onClick={() => setOpen((v) => !v)}> {toggle} </button>
//                     : <button
//                         ref={buttonRef}
//                         className={`pl-2 pr-1 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} flex items-center`}
//                         onClick={() => setOpen((v) => !v)}
//                     >
//                         <div className="pb-1 mr-1">{name}</div>
//                         {open ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="list-owner w-4 h-4" />}
//                     </button>
//                 }
//             </div>

//             {/* <button
//                 ref={buttonRef}
//                 className={`pl-2 pr-1 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} flex items-center`}
//                 onClick={() => setOpen((v) => !v)}
//             >
//                 <div className="pb-1 mr-1">{name}</div>
//                 {open ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="list-owner w-4 h-4" />}
//             </button> */}

//             {open && ReactDOM.createPortal(
//                 <div
//                     ref={containerRef} className="absolute z-10 px-2 border border-gray-500 rounded bg-gray-300 text-xs"
//                     style={posStyles}
//                 >
//                     {children}
//                 </div>
//                 , document.getElementById('portal')!)
//             }

//             {/* {open &&
//                 <div ref={containerRef} className="absolute top-[110%] left-0 right-0 z-10 px-2 border border-gray-500 rounded bg-gray-300 text-xs">
//                     {children}
//                 </div>
//             } */}
//         </>
//     );
// }
