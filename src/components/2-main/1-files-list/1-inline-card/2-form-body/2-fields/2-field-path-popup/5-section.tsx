import { ReactNode } from "react";

export function Section({ label }: { label: ReactNode; }) {
    return (
        <div className="mt-2 mb-1 py-2 px-2 bg-primary-300 rounded flex space-x-1">
            <div className="text-primary-500">
                part:
            </div>

            <div className="font-bold">
                {label}
            </div>
        </div>
    );
}
