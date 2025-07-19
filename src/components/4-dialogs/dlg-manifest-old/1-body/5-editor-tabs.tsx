import { type JSX, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { type PrimitiveAtom, useAtom } from "jotai";
import { type ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { UiSemiScrollbar } from "@ui/ui-semi-scrollbar";
import { TabSelector } from "../3-ui-tab-selector";

type EditorTabsProps = {
    pageNames: string[];
    stateIndicator: JSX.Element;
    dialogContentBody: ReactNode;
    selectedTabAtom: PrimitiveAtom<number>;
    captionDragBind: (...args: any[]) => ReactDOMAttributes;
};

export function EditorTabs({ pageNames, stateIndicator, dialogContentBody, selectedTabAtom, captionDragBind }: EditorTabsProps) {
    const [selectedTabId, setSelectedTabId] = useAtom(selectedTabAtom);

    const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
    const pageScrollOfs = useState<number[]>(() => Array(pageNames.length).fill(0))[0];

    useLayoutEffect(
        () => {
            scrollableNodeRef.current && (scrollableNodeRef.current.scrollTop = pageScrollOfs[selectedTabId]);
        }, [selectedTabId]
    );

    function onSetActive(tabId: number) {
        pageScrollOfs[selectedTabId] = scrollableNodeRef.current?.scrollTop || 0;
        setSelectedTabId(tabId);
    }

    return (
        <div className="grid grid-rows-[auto_minmax(0,1fr)]">

            {/* Tabs header */}
            <div className="px-4 pt-4 pb-2 bg-blue-900/20 flex items-center justify-between touch-none" {...captionDragBind()}>
                {/* As alternative to touch-none we can if ref.scrollHeight != ref.scrollTop + ref.clientHeight -> show indicator */}
                <TabSelector
                    tabs={pageNames}
                    active={selectedTabId}
                    setActive={onSetActive}
                />
                {stateIndicator}
            </div>

            {/* Pages scrollable content */}
            <div className="text-sm bg-white">
                <UiSemiScrollbar className="text-gray-500 overflow-auto w-full h-full" scrollableNodeProps={{ ref: scrollableNodeRef }} autoHide={false}>
                    {dialogContentBody}
                </UiSemiScrollbar>
            </div>
        </div>
    );
}

//TODO: add scroll offset: scrollableNodeRef.current?.scrollTop (may be for each page?)
