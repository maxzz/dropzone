import { ReactNode, useLayoutEffect, useRef } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { TabSelector } from '../3-ui-tab-selector';
import { UiSemiScrollbar } from '@ui/ui-semi-scrollbar';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

type EditorTabsProps = {
    pageNames: string[];
    stateIndicator: JSX.Element;
    dialogContentBody: ReactNode;
    selectedTabAtom: PrimitiveAtom<number>;
    dragBind: (...args: any[]) => ReactDOMAttributes;
};

export function EditorTabs({ pageNames, stateIndicator, dialogContentBody, selectedTabAtom, dragBind }: EditorTabsProps) {
    const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);

    const scrollableNodeRef = useRef<HTMLDivElement>();
    const pageScrollOfs = useRef<number[]>(Array(pageNames.length).fill(0)); //TODO: create on each render one time value not nice, but works. later

    useLayoutEffect(() => {
        scrollableNodeRef.current && (scrollableNodeRef.current.scrollTop = pageScrollOfs.current[selectedTab]);
    }, [selectedTab]);

    function onSetActive(v: number) {
        pageScrollOfs.current[selectedTab] = scrollableNodeRef.current?.scrollTop || 0;
        setSelectedTab(v);
    }

    return (
        <div className="grid grid-rows-[auto,minmax(0,1fr)]">

            {/* Tabs */}
            <div className="px-4 pt-4 pb-2 bg-blue-900/20 flex items-center justify-between touch-none" {...dragBind()}>
                {/* As alternative to touch-none we can if ref.scrollHeight != ref.scrollTop + ref.clientHeight -> show indicator */}
                <TabSelector
                    tabs={pageNames}
                    active={selectedTab}
                    setActive={onSetActive}
                />
                {stateIndicator}
            </div>

            {/* Pages */}
            <div className="text-sm bg-white">
                <UiSemiScrollbar className="text-gray-500 overflow-auto w-full h-full" scrollableNodeProps={{ ref: scrollableNodeRef }} autoHide={false}>
                    {dialogContentBody}
                </UiSemiScrollbar>
            </div>
        </div>
    );
}

//TODO: add atom selectedTab and scroll offset: scrollableNodeRef.current?.scrollTop (may be for each page?)
//TODO: dialog x, y to atom
