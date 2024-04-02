import { useCallback, useState } from 'react';
import { OnValueChange } from '@/hooks/atomsX';
import { EditorData } from '@/store';
import { createUrlsAtom } from './0-create-urls-atom';
import { EditorInfoTooltip } from './2-EditorInfoTooltip';
import { BottomButtons } from './3-BottomButtons';
import { TopTabsAndBody } from './6-TopTabsAndBody';
import { MatchWebState } from '../3-tabs/3-tab1-matching';

type Dialog_ManifestProps = {
    editorData: EditorData;
    setShow?: (v: boolean) => void;
};

export function Dialog_Manifest({ editorData, setShow = (v: boolean) => { } }: Dialog_ManifestProps) { /*lazy load*/
    const urlsAtom = useState(() => createUrlsAtom(editorData, onUrlsUpdate))[0];

    const onUrlsUpdate = useCallback<OnValueChange<MatchWebState>>(
        ({ nextValue }) => {
            console.log('urls updated', nextValue);
        }, []
    );

    return (
        <TopTabsAndBody
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
