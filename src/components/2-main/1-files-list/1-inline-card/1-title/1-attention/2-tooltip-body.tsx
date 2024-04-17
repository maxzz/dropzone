import { Fragment } from "react";
import { FileUs } from "@/store";
import { SymbolDot } from "@ui/icons";

export function TooltipBody({ fileUs, fileIndex }: { fileUs: FileUs; fileIndex: number; }) {
    const bailOuts = [fileUs.meta?.[0]?.disp.bailOut, fileUs.meta?.[1]?.disp.bailOut];
    return (
        <div className="pb-2 max-w-[17rem] text-sm bg-primary-100 rounded-[2px]">

            <div className="px-3 py-4 bg-red-700 text-primary-100 rounded-sm rounded-b-none">
                <div className="">There are problems in the file with index {fileIndex} to check why:</div>
            </div>

            {bailOuts.map(
                (bailOut, idx) => (
                    <Fragment key={`bailout${idx}`}>
                        {bailOut &&
                            <div className="px-3 py-1">
                                <div className="font-bold">
                                    {idx === 0 ? 'Login:' : 'Password change:'}
                                </div>

                                {bailOut.map(
                                    (item, key) => (
                                        <div className="flex items-center" key={key}>
                                            <SymbolDot className="ml-1 size-4 flex-none self-start mt-0.5" />
                                            {item}
                                        </div>
                                    )
                                )}
                            </div>}
                    </Fragment>
                )
            )}
        </div>
    );
}
