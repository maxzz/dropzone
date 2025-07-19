import { type ReactNode, useState } from "react";
import { type PrimitiveAtom, atom } from "jotai";
import { type ManiEditorData } from "@/store";
import { useDrag } from "@use-gesture/react";
import { a, useSpring } from "@react-spring/web";
import { type ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

import { type MatchWebState, Tab1_MatchWeb } from "../2-tabs/1-matching";
import { Tab2_MatchWindows } from "../2-tabs/2-match-windows";
import { Tab3_Options } from "../2-tabs/3-options";
import { Tab4_Fields } from "../2-tabs/4-fields";

import { ManiModifiedIndicator } from "./8-mani-modified-indicator";
import { PageContentRender } from "./3-page-content-render";
import { EditorTabs } from "./4-editor-tabs";

type DialogFrameAndTabsProps = {
    footer: ReactNode;
    editorUrlsAtom: PrimitiveAtom<MatchWebState>;
    editorData: ManiEditorData;
};

export function DialogFrameAndTabs({ footer, editorUrlsAtom, editorData }: DialogFrameAndTabsProps) {

    // Dialog caption dragging
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const captionDragBind = useDrag(
        ({ down, offset: [mx, my] }) => {
            api.start({ x: mx, y: my, immediate: down });
        }
    );

    return (
        <a.div style={{ x, y }} className="w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr)_auto] bg-gray-200 rounded overflow-hidden">
            <TabsCombined
                editorUrlsAtom={editorUrlsAtom}
                editorData={editorData}
                captionDragBind={captionDragBind}
            />
            {footer}
        </a.div>
    );
}

type TabsCombinedProps = {
    editorUrlsAtom: PrimitiveAtom<MatchWebState>;
    editorData: ManiEditorData;
    captionDragBind: (...args: any[]) => ReactDOMAttributes;
};

function TabsCombined({ editorUrlsAtom, editorData, captionDragBind }: TabsCombinedProps) {
    // Pages
    const pages = {
        'Web': <Tab1_MatchWeb editorUrlsAtom={editorUrlsAtom} />,
        'Win32': <Tab2_MatchWindows editorData={editorData} />,
        'Options': <Tab3_Options editorData={editorData} />,
        'Fields': <Tab4_Fields editorData={editorData} />,
    };

    const pageNames = Object.keys(pages);
    const pageComponents = Object.values(pages);

    const selectedTabAtom = useState(() => atom(0))[0];

    return (
        <EditorTabs
            pageNames={pageNames}
            stateIndicator={<ManiModifiedIndicator editorUrlsAtom={editorUrlsAtom} />}
            dialogContentBody={<PageContentRender pageComponents={pageComponents} selectedTabAtom={selectedTabAtom} />}
            selectedTabAtom={selectedTabAtom}
            captionDragBind={captionDragBind}
        />
    );
}

//TODO: add dialog x, y to atom
