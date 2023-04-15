import { classNames } from "@/utils";
import React, { useState } from "react";

/*
export function SimpleToogleCheckbox() {
    // https://buildui.com/recipes/ios-animated-switch
    const [on, setOn] = useState(false);
    console.log('on', on);

    return (
        <div className=" transition-all duration-[400ms]">
            {/* <label className="group inline-flex touch-none items-center" data-selected={on} onClick={() => setOn(v => !v)}> * /}
            {/* <label className="group inline-flex touch-none items-center" data-selected={on}> * /}
            <label className="group inline-flex touch-none items-center" data-selected={on}>
                <div
                    style={{
                        border: '0px',
                        clip: 'rect(0px, 0px, 0px, 0px)',
                        clipPath: 'inset(50%)',
                        height: '1px',
                        margin: '-1px',
                        overflow: 'hidden',
                        padding: '0px',
                        position: 'absolute',
                        width: '1px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <input type="checkbox" role="switch" onClick={() => setOn(v => !v)}/>
                </div>

                <span className="
                    mr-4 h-6 w-9 rounded-full border-2 
                    border-transparent bg-zinc-600 ring-offset-2 ring-offset-zinc-900 transition duration-200 
                    group-data-[selected]:bg-green-500 
                    group-data-[focus-visible]:ring-2 
                    cursor-pointer"
                >
                    <span className="
                        block h-5 w-5 origin-right rounded-full 
                        bg-white shadow transition-all duration-200 
                        group-data-[selected]:ml-3 
                        group-data-[selected]:group-data-[pressed]:ml-2 
                        group-data-[pressed]:w-6"
                    >
                    </span>
                </span>

                <span>Airplane Mode</span>
            </label>
        </div>
    );
}
*/

/*
Alternatives:
    //http://localhost:8090/tailwind-ui-04-14-23\preview\components\assets
    <div class="ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20">
        <div class="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4">
        </div>
    </div>
*/
export function SimpleToogle() {
    const [on, setOn] = useState(false);
    return (
        <button
            className={classNames(
                "p-1 h-6 w-10 ring-1 ring-inset rounded-full transition duration-100 ease-in-out pointer-events-auto select-none",
                "ring-primary-100",
                on ? "bg-primary-300/50" : "bg-primary-700",
            )}
            onClick={() => setOn(v => !v)}
        >
            <div className={classNames("h-4 w-4 rounded-full bg-white ring-1 ring-primary-500/50 shadow-[0px_3px_3px_#0005] transition duration-100 ease", on && " translate-x-[100%]")}>
            </div>
        </button>
    );
}
