import { useCallback, useState } from "react";
import { type Getter, useAtomValue } from "jotai";
import { useDrag } from "@use-gesture/react";
import { a, useSpring } from "@react-spring/web";
import { type ManiEditorData } from "@/store";
import { type OnChangeParamsWithNameScope, type UrlsEditorData, createUrlsEditorData } from "../2-tabs/1-matching";
import { AllTabsTopHolder } from "./2-all-tabs-top-holder";
import { ManiInfoTooltip } from "./8-mani-info-tooltip";
import { BottomButtons } from "./4-editor-bottom-buttons";

type Dialog_ManifestProps = {
    editorData: ManiEditorData;
    setShow?: (v: boolean) => void;
};

export function Dialog_Manifest({ editorData, setShow }: Dialog_ManifestProps) { // This is lazy loaded
    const fileUs = useAtomValue(editorData.fileUsAtom);

    const onChangeEditorUrls = useCallback<OnChangeParamsWithNameScope>(
        ({ name, get, set, nextValue }) => {
            printMatchWebState(name,nextValue, get);
        }, []
    );

    const urlsEditorData = useState(() => createUrlsEditorData(fileUs, editorData.formIdx, onChangeEditorUrls))[0];

    // Dialog caption dragging
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const captionDragBind = useDrag(
        ({ down, offset: [mx, my] }) => {
            api.start({ x: mx, y: my, immediate: down });
        }
    );

    return (
        <a.div style={{ x, y }} className="w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr)_auto] bg-gray-200 rounded overflow-hidden">
            <AllTabsTopHolder
                urlsEditorData={urlsEditorData}
                editorData={editorData}
                captionDragBind={captionDragBind}
            />
            <div className="px-4 py-4 bg-white flex items-center justify-between">
                <ManiInfoTooltip editorData={editorData} />
                <BottomButtons setShow={setShow} />
            </div>
        </a.div>
    );
}

function printMatchWebState(changeName: string, urlsEditorData: UrlsEditorData, get: Getter) {
    console.log(`MatchWebState changeName:"${changeName}" nextValue:`, JSON.stringify(urlsEditorData, null, 4));
}

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)

//TODO: check if we have forms or what we have at all (i.e. we have web, win, fields, script, or exclude manifest)
