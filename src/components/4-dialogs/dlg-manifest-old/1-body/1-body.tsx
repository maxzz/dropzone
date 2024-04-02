import { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { atomWithCallback, OnValueChange } from '@/hooks/atomsX';
import { EditorData, formIdxName } from '@/store';
import { a, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { classNames } from '@/utils';
import { UiTip } from '@ui/ui-tooltip';
import { ManiFilenameParts } from '@/components/2-main/1-files-list/1-inline-card/1-title/4-filename';
import { SymbolAttention, IconInfo } from '@ui/icons';
import { Tab1_MatchWeb, MatchWebState, MatchWebStateAtom } from '../3-tabs/3-tab1-matching';
import { Tab2_MatchWindows } from '../3-tabs/3-tab2-match-windows';
import { Tab3_Options } from '../3-tabs/3-tab3-options';
import { Tab4_Fields } from '../3-tabs/3-tab4-fields';
import { TabSelector } from '../2-tab-selector';
import { UiSemiScrollbar } from '@ui/ui-semi-scrollbar';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
//import { toastWarning } from '@ui/UIToaster';

function ManifestState({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const urls = useAtomValue(urlsAtom);
    const dirty = useAtomValue(urls.dirtyAtom);
    return (<>
        {dirty &&
            <SymbolAttention
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
        <UiTip
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
        </UiTip>
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

function RealPages({ pageComponents, selectedTabAtom }: { pageComponents: JSX.Element[]; selectedTabAtom: PrimitiveAtom<number>; }) {
    const selectedTab = useAtomValue(selectedTabAtom);
    return (<>
        {pageComponents.map((pageContent, idx) => (
            <div className={classNames(selectedTab !== idx && 'hidden')} key={idx}>
                {pageContent}
            </div>
        ))}
    </>);
}

//TODO: add atom selectedTab and scroll offset: scrollableNodeRef.current?.scrollTop (may be for each page?)
//TODO: dialog x, y to atom

export function EditorTabs({ pageNames, stateIndicator, dialogContentBody, selectedTabAtom, dragBind }: {
    pageNames: string[];
    stateIndicator: JSX.Element;
    dialogContentBody: ReactNode;
    selectedTabAtom: PrimitiveAtom<number>;
    dragBind: (...args: any[]) => ReactDOMAttributes;
}) {
    const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);

    const scrollableNodeRef = useRef<HTMLDivElement>();
    const pageScrollOfs = useRef<number[]>(Array(pageNames.length).fill(0));
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
            <div className="px-4 pt-4 pb-2 bg-blue-900/20 flex items-center justify-between touch-none" {...dragBind()} >
                {/* As alternative to touch-none we can if ref.scrollHeight != ref.scrollTop + ref.clientHeight -> show indicator */}
                <TabSelector tabs={pageNames} active={selectedTab} setActive={onSetActive} />
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

function TopTabsAndBody({ footer, urlsAtom, editorData }: { footer: ReactNode; urlsAtom: PrimitiveAtom<MatchWebState>; editorData: EditorData; }) {
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
    const pageNames = Object.keys(pages);
    const pageComponents = Object.values(pages);

    const selectedTabAtom = useState(atom(0))[0];

    return (
        <a.div style={{ x, y }} className="w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr),auto]  bg-gray-200 rounded overflow-hidden">
            <EditorTabs
                pageNames={pageNames}
                stateIndicator={
                    <ManifestState urlsAtom={urlsAtom} />
                }
                dialogContentBody={
                    <RealPages pageComponents={pageComponents} selectedTabAtom={selectedTabAtom} />
                }
                selectedTabAtom={selectedTabAtom}
                dragBind={dragBind}
            />
            {footer}
        </a.div>
    );
}

function createUrlsAtom(editorData: EditorData, onChange: OnValueChange<MatchWebState>): PrimitiveAtom<MatchWebState> {
    const fileUs = useAtomValue(editorData.fileUsAtom);

    // Page Web Matching
    const { web_ourl: o = '', web_murl: m = '', web_qurl: q = '' } = fileUs.meta?.[editorData.formIdx]?.mani?.detection || {};
    const initial = { o, m, q, };

    return atomWithCallback<MatchWebState>(
        {
            ...initial,
            initial,
            dirtyAtom: atom<boolean>(false)
        },
        onChange,
    );
}

export function Dialog_Manifest({ editorData, setShow = (v: boolean) => { } }: { editorData: EditorData; setShow?: (v: boolean) => void; }) { /*lazy load*/

    const onUrlsUpdate = useCallback<OnValueChange<MatchWebState>>(({ nextValue }) => {
        console.log('urls updated', nextValue);
    }, []);

    const urlsAtom = useState(createUrlsAtom(editorData, onUrlsUpdate))[0];
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
