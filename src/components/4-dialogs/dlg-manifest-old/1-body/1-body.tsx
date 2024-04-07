import { useCallback, useState } from 'react';
import { OnValueChange } from '@/hooks';
import { EditorData } from '@/store';
import { createUrlsAtom } from './0-create-urls-atom';
import { EditorInfoTooltip } from './2-editor-info-tooltip';
import { BottomButtons } from './3-bottom-buttons';
import { DialogFrameAndTabs } from './6-dialog-frame-and-tabs';
import { MatchWebState } from '../2-tabs/1-matching/0-urls-dirty';
import { useAtomValue } from 'jotai';

type Dialog_ManifestProps = {
    editorData: EditorData;
    setShow?: (v: boolean) => void;
};

export function Dialog_Manifest({ editorData, setShow = (v: boolean) => { } }: Dialog_ManifestProps) { /*lazy load*/
    const fileUs = useAtomValue(editorData.fileUsAtom);

    const onUrlsUpdate = useCallback<OnValueChange<MatchWebState>>(
        ({ nextValue }) => {
            console.log('urls updated', nextValue);
        }, []
    );

    const urlsAtom = useState(() => createUrlsAtom(fileUs, editorData.formIdx, onUrlsUpdate))[0];

    return (
        <DialogFrameAndTabs
            urlsAtom={urlsAtom}
            editorData={editorData}
            footer={
                <div className="px-4 py-4 bg-white flex items-center justify-between">
                    <EditorInfoTooltip editorData={editorData} />
                    <BottomButtons setShow={setShow} />
                </div>
            }
        />
    );
}

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)

//TODO: check if we have forms or what we have at all (i.e. we have web, win, fields, script, or exclude manifest)
