import React from 'react';

export function Section({ label }: { label: string; }) {
    return (
        <div className="mt-2 mb-1 col-span-2 text-[#32ffdaa0] font-normal border-[#32ffda40] border-b">{label}</div>
    );
}
