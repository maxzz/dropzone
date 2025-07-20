import { useCallback, useState } from "react";
import { type Getter, useAtomValue } from "jotai";
import { type OnValueChange } from "@/utils";
import { type ManiEditorData } from "@/store";
import { type MatchWebState, createEditorUrlsAtom } from "../2-tabs/1-matching";
import { DialogFrameAndTabs } from "./2-dialog-frame-and-tabs";

type Dialog_ManifestProps = {
    editorData: ManiEditorData;
    setShow?: (v: boolean) => void;
};

export function Dialog_Manifest({ editorData, setShow }: Dialog_ManifestProps) { /*lazy load*/
    const fileUs = useAtomValue(editorData.fileUsAtom);

    const editorUrlsAtom = useState(() => createEditorUrlsAtom(fileUs, editorData.formIdx, onChangeEditorUrls))[0];

    const onChangeEditorUrls = useCallback<OnValueChange<MatchWebState>>(
        ({ get, set, nextValue }) => {
            printMatchWebState(nextValue, get);
        }, []
    );

    return (
        <DialogFrameAndTabs
            editorUrlsAtom={editorUrlsAtom}
            editorData={editorData}
            setShow={setShow}
        />
    );
}

function printMatchWebState(urls: MatchWebState, get: Getter) {
    console.log('MatchWebState', JSON.stringify(urls, null, 4));
}

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)

//TODO: check if we have forms or what we have at all (i.e. we have web, win, fields, script, or exclude manifest)
