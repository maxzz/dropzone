import { classNames } from "@/utils";
import React, { useState } from "react";

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
            <div
                className={classNames(
                    "h-4 w-4 rounded-full bg-white ring-1 ring-primary-500/50 shadow-[0px_3px_3px_#0005] transition duration-100 ease",
                    on && " translate-x-full"
                )}
            >
            </div>
        </button>
    );
}
