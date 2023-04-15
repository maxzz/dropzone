import React, { useState } from "react";

export function SimpleToogle() {
    const [on, setOn] = useState(false);
    return (
        <div
            className="ml-auto p-1 h-6 w-10 bg-primary-300/50 ring-primary-100 ring-1 ring-inset rounded-full transition duration-150 ease-in-out pointer-events-auto"
            onClick={() => setOn(v => !v)}
        >
            <div className={`h-4 w-4 rounded-full bg-white ring-1 ring-primary-700/40 shadow-sm transition duration-150 ease-out${on ? ' translate-x-4' : ''}`}>
            </div>
        </div>
    );
}
