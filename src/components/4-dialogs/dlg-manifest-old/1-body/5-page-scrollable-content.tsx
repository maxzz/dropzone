import { type ReactNode, useLayoutEffect, useRef } from "react";
import { type PrimitiveAtom, useAtomValue } from "jotai";
import { UiSemiScrollbar } from "@ui/ui-semi-scrollbar";

export function PagesScrollableContent({ children, pageScrollOfsAtom, selectedTabAtom }: { children: ReactNode; pageScrollOfsAtom: PrimitiveAtom<number[]>; selectedTabAtom: PrimitiveAtom<number>; }) {
    const selectedTabId = useAtomValue(selectedTabAtom);
    const pageScrollOfs = useAtomValue(pageScrollOfsAtom);
    const scrollableNodeRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(
        () => {
            scrollableNodeRef.current && (scrollableNodeRef.current.scrollTop = pageScrollOfs[selectedTabId]);
        }, [selectedTabId]
    );
    
    return (<>
        <div className="text-sm bg-white">
            <UiSemiScrollbar className="text-gray-500 overflow-auto w-full h-full" scrollableNodeProps={{ ref: scrollableNodeRef }} autoHide={false}>
                {children}
            </UiSemiScrollbar>
        </div>
    </>);
}
