import { MatchWebState } from "../0-all";

export function FinalMatchUrl({ urls }: { urls: MatchWebState; }) {
    return (
        <div className="mt-3 px-2 pt-2 text-[.65rem] bg-yellow-100 border border-yellow-400 rounded-sm cursor-default" title="This is how url will be stored">
            
            <div className="-mt-4 ">
                <span className="px-1 bg-yellow-200 border border-yellow-500 rounded-sm select-none">
                    Final raw format
                </span>
            </div>

            <div className="overflow-x-auto break-all">
                {urls.current.m}
            </div>
        </div>
    );
}
