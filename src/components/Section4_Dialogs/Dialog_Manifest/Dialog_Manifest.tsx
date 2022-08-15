import React, { HTMLAttributes, useState } from 'react';
import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
import { EditorData, FileUs, formIdxName } from '@/store';
import { a, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { classNames } from '@/utils/classnames';
import { OldPopper_UITooltip } from '@ui/UITooltip';
import { ManiFilenameParts } from '@/components/Section2_Main/Panel1_FilesList/Card/Part1Card_Title/CardTitleFilename';
import { IconInfo } from '@ui/UIIcons';
import { IconAttention } from '@ui/UIIconSymbols';
import { Tab1_MatchWeb, MatchWebState, MatchWebStateAtom } from './Tab1_Matching';
import { Tab2_MatchWindows } from './Tab2_MatchWindows';
import { Tab3_Options } from './Tab3_Options';
import { Tab4_Fields } from './Tab4_Fields';
import { EditorTabs } from './TabSelector';
//import { toastWarning } from '@ui/UIToaster';

function ManifestState({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const urls = useAtomValue(urlsAtom);
    const dirty = useAtomValue(urls.dirtyAtom);
    return (<>
        {dirty &&
            <IconAttention
                className="self-end w-4 h-4 text-[#f6673b]"
                fill="#ffad42" // #ff5400 stroke="#f6673b" strokeWidth={0.8}
                style={{ filter: 'drop-shadow(#f66b3b7a 0px 0px 0.15rem)' }}
                title="Modified"
            />
        }
    </>);
}

function EditorInfoTooltip({ editorData }: { editorData: EditorData; }) {
    const fileUs = useAtomValue(editorData.fileUsAtom);
    const stats = fileUs.stats;
    const formName = `${formIdxName(editorData.formIdx)}`;
    const fname = ManiFilenameParts({ fname: fileUs.fname, classLg: "px-1 text-[.65rem] font-bold text-gray-600 opacity-100" });
    return (
        <OldPopper_UITooltip
            trigger={
                <IconInfo
                    className="w-7 h-7 text-gray-300"
                    style={{ filter: 'drop-shadow(#907bdab0 0px 0px .2rem)' }}
                    fill="#fff"
                    stroke="#0004"
                    strokeWidth={1}
                />
            }
            arrow={true}
        >
            {/* Popup content */}
            <div className="text-xs grid grid-cols-[auto,1fr] gap-x-2">
                <div className="font-bold">Form</div>
                <div>{formName}</div>

                {stats.domain && <>
                    <div className="font-bold">Domain</div>
                    <div>{stats.domain}</div>
                </>}

                <div className="font-bold">Filename</div>
                <div>{fname}</div>

                {stats.dateCreated && <>
                    <div className="font-bold">Created</div>
                    <div>{stats.dateCreated}</div>
                </>}

                {stats.dateModified && <>
                    <div className="font-bold">Modified</div>
                    <div>{stats.dateModified}</div>
                </>}
            </div>
        </OldPopper_UITooltip>
    );
}

function BottomButtons({ setShow }: { setShow: (v: boolean) => void; }) {
    return (
        <div className="flex space-x-2">
            <button
                className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow active:scale-[.97]"
                onClick={() => {
                    setShow(false);
                    // toastWarning(<div><div className="font-bold">Not implemented</div><div className="">yet</div></div>, { style: { backgroundColor: 'tomato' } });
                }}
            >OK</button>

            <button
                className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow active:scale-[.97]"
                onClick={() => {
                    setShow(false);
                }}
            >Cancel</button>
        </div>
    );
}

function TopTabsAndBody({ children, urlsAtom, editorData }: { urlsAtom: PrimitiveAtom<MatchWebState>; editorData: EditorData; } & HTMLAttributes<HTMLDivElement>) {
    // Caption dragging
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const dragBind = useDrag(({ down, offset: [mx, my] }) => api.start({ x: mx, y: my, immediate: down }));

    // Pages
    const pages = {
        'Web': <Tab1_MatchWeb urlsAtom={urlsAtom} />,
        'Win32': <Tab2_MatchWindows editorData={editorData} />,
        'Options': <Tab3_Options editorData={editorData} />,
        'Fields': <Tab4_Fields editorData={editorData} />,
    };

    return (
        <a.div style={{ x, y }} className={classNames("w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr),auto]", "bg-gray-200 rounded overflow-hidden")}>
            <EditorTabs
                pages={pages}
                stateIndicator={
                    <ManifestState urlsAtom={urlsAtom} />
                }
                dragBind={dragBind}
            />
            {children}
        </a.div>
    );
}

function createUrlsAtom(fileUs: FileUs, editorData: EditorData): PrimitiveAtom<MatchWebState> {
    // Page Web Matching
    const { web_ourl: o = '', web_murl: m = '', web_qurl: q = '' } = fileUs.meta?.[editorData.formIdx]?.mani?.detection || {};
    const initial = { o, m, q, };

    return atomWithCallback<MatchWebState>(
        {
            ...initial,
            initial,
            dirtyAtom: atom<boolean>(false)
        },
        ({ nextValue }) => {
            console.log('urls updated', nextValue);
        }
    );
}

export default function Dialog_Manifest({ editorData, setShow = (v: boolean) => { } }: { editorData: EditorData; setShow?: (v: boolean) => void; }) { /*lazy load*/
    const fileUs = useAtomValue(editorData.fileUsAtom);

    // Page Web Matching
    const { web_ourl: o = '', web_murl: m = '', web_qurl: q = '' } = fileUs.meta?.[editorData.formIdx]?.mani?.detection || {};
    const initial = { o, m, q, };

    const urlsAtom = useState(createUrlsAtom(fileUs, editorData))[0];

    return (
        <TopTabsAndBody urlsAtom={urlsAtom} editorData={editorData}>
            {/* Editor footer */}
            <div className="px-4 py-4 bg-white flex items-center justify-between">
                <EditorInfoTooltip editorData={editorData} />
                <BottomButtons setShow={setShow} />
            </div>
        </TopTabsAndBody>
    );
}

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)

//TODO: check if we have forms or what we have at all (i.e. we have web, win, fields, script, or exclude manifest)
