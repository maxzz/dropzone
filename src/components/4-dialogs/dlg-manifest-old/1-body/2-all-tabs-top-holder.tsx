import { type ReactNode, useState } from "react";
import { type PrimitiveAtom, atom, useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type ManiEditorData } from "@/store";
import { type ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

import { type UrlsEditorDataAtom, Tab1_MatchWeb } from "../2-tabs/1-matching";
import { Tab2_MatchWindows } from "../2-tabs/2-match-windows";
import { Tab3_Options } from "../2-tabs/3-options";
import { Tab4_Fields } from "../2-tabs/4-fields";

import { ManiModifiedIndicator } from "./8-mani-modified-indicator";
import { EditorTabs } from "./3-editor-tabs";

type TabsCombinedProps = {
    urlsEditorData: UrlsEditorDataAtom;
    editorData: ManiEditorData;
    captionDragBind: (...args: any[]) => ReactDOMAttributes;
};

export function AllTabsTopHolder({ urlsEditorData, editorData, captionDragBind }: TabsCombinedProps) {
    // Pages
    const pages = {
        'Web': <Tab1_MatchWeb urlsEditorDataAtom={urlsEditorData} />,
        'Win32': <Tab2_MatchWindows editorData={editorData} />,
        'Options': <Tab3_Options editorData={editorData} />,
        'Fields': <Tab4_Fields editorData={editorData} />,
    };

    const pageNames = Object.keys(pages);
    const pageComponents = Object.values(pages);

    const selectedTabAtom = useState(() => atom(0))[0];
    const pageScrollOfsAtom = useState(() => atom(Array(pageNames.length).fill(0)))[0];

    return (
        <EditorTabs
            pageNames={pageNames}
            pageScrollOfsAtom={pageScrollOfsAtom}
            stateIndicator={<ManiModifiedIndicator editorUrlsAtom={urlsEditorData} />}
            selectedTabAtom={selectedTabAtom}
            captionDragBind={captionDragBind}
        >
            <PageContentRender
                pageComponents={pageComponents}
                selectedTabAtom={selectedTabAtom}
            />
        </EditorTabs>
    );
}

function PageContentRender({ pageComponents, selectedTabAtom }: { pageComponents: ReactNode[]; selectedTabAtom: PrimitiveAtom<number>; }) {
    const selectedTab = useAtomValue(selectedTabAtom);
    return (<>
        {pageComponents.map(
            (pageContent, idx) => (
                <div className={classNames(selectedTab !== idx && 'hidden')} key={idx}>
                    {pageContent}
                </div>
            ))
        }
    </>);
}
