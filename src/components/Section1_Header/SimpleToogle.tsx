import { classNames } from "@/utils";
import React, { useState } from "react";

export function SimpleToogle() {
    const [on, setOn] = useState(false);
    return (
        <div
            className={classNames(
                "p-1 h-6 w-10 ring-1 ring-inset rounded-full transition duration-150 ease-in-out pointer-events-auto",
                "ring-primary-100",
                on ? "bg-primary-300/50" : "bg-primary-700",
            )}
            onClick={() => setOn(v => !v)}
        >
            <div className={classNames("h-4 w-4 rounded-full bg-white ring-1 ring-primary-700/40 shadow-sm transition duration-150 ease-out", on && " translate-x-4")}>
            </div>
        </div>
    );
}
