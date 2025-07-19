import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { type PrimitiveAtom, useAtom } from "jotai";
import { type ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { UiSemiScrollbar } from "@ui/ui-semi-scrollbar";
import { TabSelector } from "../3-ui-tab-selector";

type EditorTabsProps = {
    pageNames: string[];
    stateIndicator: ReactNode;
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
            <TabsHeader
                pageNames={pageNames}
                selectedTabId={selectedTabId}
                onSetActive={onSetActive}
                stateIndicator={stateIndicator}
                captionDragBind={captionDragBind}
            />

            {/* Pages scrollable content */}
            <div className="text-sm bg-white">
                <UiSemiScrollbar className="text-gray-500 overflow-auto w-full h-full" scrollableNodeProps={{ ref: scrollableNodeRef }} autoHide={false}>
                    {dialogContentBody}
                </UiSemiScrollbar>
            </div>
        </div>
    );
}

type TabsHeaderProps = {
    pageNames: string[];
    selectedTabId: number;
    onSetActive: (tabId: number) => void;
    stateIndicator: ReactNode;
    captionDragBind: (...args: any[]) => ReactDOMAttributes;
};

function TabsHeader({ pageNames, selectedTabId, onSetActive, stateIndicator, captionDragBind }: TabsHeaderProps) {
    return (
        <div className="px-4 pt-4 pb-2 bg-blue-900/20 flex items-center justify-between touch-none" {...captionDragBind()}> {/* As alternative to touch-none we can if ref.scrollHeight != ref.scrollTop + ref.clientHeight -> show indicator */}
            <TabSelector
                tabs={pageNames}
                active={selectedTabId}
                setActive={onSetActive}
            />
            {stateIndicator}
        </div>
    );
}

//TODO: add scroll offset: scrollableNodeRef.current?.scrollTop (may be for each page?)
