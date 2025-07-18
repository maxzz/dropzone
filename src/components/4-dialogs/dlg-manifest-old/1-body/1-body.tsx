import { useCallback, useState } from 'react';
import { useAtomValue } from 'jotai';
import { type OnValueChange } from '@/util-hooks';
import { type ManiEditorData } from '@/store';
import { type MatchWebState, createUrlsAtom } from '../2-tabs/1-matching';
import { ManiInfoTooltip } from './2-mani-info-tooltip';
import { BottomButtons } from './3-bottom-buttons';
import { DialogFrameAndTabs } from './6-dialog-frame-and-tabs';

type Dialog_ManifestProps = {
    editorData: ManiEditorData;
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
                    <ManiInfoTooltip editorData={editorData} />
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
