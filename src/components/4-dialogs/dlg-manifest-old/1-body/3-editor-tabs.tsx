import { type ReactNode, useLayoutEffect, useRef } from "react";
import { type PrimitiveAtom, useAtom } from "jotai";
import { type ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { TabSelector } from "../3-ui-tab-selector";
import { PagesScrollableContent } from "./5-page-scrollable-content";

type EditorTabsProps = {
    pageNames: string[];
    pageScrollOfsAtom: PrimitiveAtom<number[]>;
    stateIndicator: ReactNode;
    children: ReactNode;
    selectedTabAtom: PrimitiveAtom<number>;
    captionDragBind: (...args: any[]) => ReactDOMAttributes;
};

export function EditorTabs({ pageNames, pageScrollOfsAtom, stateIndicator, children, selectedTabAtom, captionDragBind }: EditorTabsProps) {
    const [selectedTabId, setSelectedTabId] = useAtom(selectedTabAtom);
    const [pageScrollOfs, setPageScrollOfs] = useAtom(pageScrollOfsAtom);
    const scrollableNodeRef = useRef<HTMLDivElement | null>(null);

    function onSetActive(newTabId: number) {
        setPageScrollOfs(pageScrollOfs.map((v, i) => i === selectedTabId ? scrollableNodeRef.current?.scrollTop || 0 : v));
        setSelectedTabId(newTabId);
    }

    return (
        <div className="grid grid-rows-[auto_minmax(0,1fr)]">

            {/* Tabs header */}
            <div className="px-4 pt-4 pb-2 bg-blue-900/20 flex items-center justify-between touch-none" {...captionDragBind()}> {/* As alternative to touch-none we can if ref.scrollHeight != ref.scrollTop + ref.clientHeight -> show indicator */}
                <TabSelector
                    tabs={pageNames}
                    active={selectedTabId}
                    setActive={onSetActive}
                />
                {stateIndicator}
            </div>

            <PagesScrollableContent pageScrollOfsAtom={pageScrollOfsAtom} selectedTabAtom={selectedTabAtom}>
                {children}
            </PagesScrollableContent>
        </div>
    );
}

//TODO: add scroll offset: scrollableNodeRef.current?.scrollTop (may be for each page?)
