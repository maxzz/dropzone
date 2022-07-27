import React, { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
import { EditorData, formIdxName } from '@/store';
import { classNames } from '@/utils/classnames';
import { UITooltip } from '@ui/UITooltip';
import { UISimpleBar } from '@ui/UIScrollbar/UIScrollbar';
import { Tab2_MatchWindows } from './Tab2_MatchWindows';
import { MatchWebState, MatchWebStateAtom, Tab1_MatchWeb } from './Tab1_Matching';
import { parsedFname } from '../../Section2_Main/Panel1_FilesList/Card/CardTitle';
import { Tab3_Options } from './Tab3_Options';
import { Tab4_Fields } from './Tab4_Fields';
import { a, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { IconInfo } from '@ui/UIIcons';
import { IconAttention } from '@ui/UIIconSymbols';
//import { toastWarning } from '@ui/UIToaster';

function EditorInfo({ editorData }: { editorData: EditorData; }) {
    const fileUs = useAtomValue(editorData.fileUsAtom);
    const stats = fileUs.stats;
    const formName = `${formIdxName(editorData.formIdx)}`;
    const fname = parsedFname({ fname: fileUs.fname, styleLg: "px-1 text-[.65rem] font-bold text-gray-600 opacity-100" });
    return (<>
        <UITooltip trigger={<IconInfo
            className="w-7 h-7 text-gray-300"
            style={{ filter: 'drop-shadow(#907bdab0 0px 0px .2rem)' }}
            fill="#fff"
            stroke="#0004"
            strokeWidth={1}
        />} arrow={true}>
            <div className="text-xs grid grid-cols-[auto,1fr] gap-x-2">
                <div className="font-bold">Form</div>
                <div className="">{formName}</div>

                {stats.domain && <>
                    <div className="font-bold">Domain</div>
                    <div className="">{stats.domain}</div>
                </>}

                <div className="font-bold">Filename</div>
                <div className="">{fname}</div>

                {stats.dateCreated && <>
                    <div className="font-bold">Created</div>
                    <div className="">{stats.dateCreated}</div>
                </>}

                {stats.dateModified && <>
                    <div className="font-bold">Modified</div>
                    <div className="">{stats.dateModified}</div>
                </>}
            </div>
        </UITooltip>
    </>);
}

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

/*
function TabSelectorOld({ tabs, active, setActive }: { tabs: string[], active: number, setActive: (v: number) => void; }) {
    return (
        <div className="flex justify-items-start space-x-1">
            {tabs.map((pageTitle, idx) => (
                <button
                    className={classNames(
                        'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none transition-colors',
                        active === idx ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                    )}
                    style={{ filter: 'drop-shadow(#0000003f 0px 0px 0.15rem)' }}
                    key={pageTitle}
                    onClick={() => setActive(idx)}
                >
                    {pageTitle}
                </button>
            ))}
        </div>
    );
}
*/

function TabSelector({ tabs, active, setActive }: { tabs: string[], active: number, setActive: (v: number) => void; }) {
    const $root = React.useRef<HTMLDivElement>(null);
    const $indicator = React.useRef<HTMLDivElement>(null);
    const $items = React.useRef(tabs.map<React.RefObject<HTMLButtonElement>>(React.createRef));

    const [indicatorStyles, api] = useSpring(() => ({ x: 0, y: 0, width: 0, height: 0, config: { mass: .3, tension: 280, friction: 14 } }));

    React.useEffect(() => {
        function animate() {
            const menuOffset = $root.current?.getBoundingClientRect();
            const activeItem = $items.current[active].current;
            if (menuOffset && activeItem) {
                const { top, left, width, height } = activeItem.getBoundingClientRect();
                api.start({
                    x: left - menuOffset.x,
                    y: top - menuOffset.y,
                    width: width,
                    height: height,
                });

                // api.start([{
                //     x: left - menuOffset.x,
                //     y: top - menuOffset.y,
                //     width: width,
                //     height: height,
                // }
                // ]);

                // api.start(async (next, cancel) => ({
                //     x: left - menuOffset.x,
                //     y: top - menuOffset.y,
                //     width: width,
                //     height: height,
                // }));
            }
        }
        animate();
    }, [active, $root.current, $indicator.current, $items.current,]);

    return (
        <div ref={$root} className="relative flex">
            <a.div
                ref={$indicator}
                style={{ ...indicatorStyles, filter: 'drop-shadow(#0003 0px 0px .05rem)' }}
                className="absolute bg-gray-50 rounded border border-gray-900/50 z-[1] shadow"
            />
            <div className="flex justify-items-start space-x-1">
                {tabs.map((pageTitle, idx) => (
                    <button
                        ref={$items.current[idx]}
                        className={classNames(
                            'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none z-10',
                            active === idx ? '' : 'text-gray-700/80 hover:bg-white/[0.2] hover:text-white/75'
                        )}
                        style={{ filter: 'drop-shadow(#0005 0px 0px .1rem)' }}
                        key={pageTitle}
                        onClick={() => setActive(idx)}
                    >
                        {pageTitle}
                    </button>
                ))}
            </div>
        </div>
    );
}

function EditorTabs({ pages, stateIndicator, dragBind }: { pages: Record<string, JSX.Element>; stateIndicator: JSX.Element; dragBind: (...args: any[]) => ReactDOMAttributes; }) {
    const [selectedTab, setSelectedTab] = useState(0);

    const scrollableNodeRef = useRef<HTMLDivElement>();
    const pageScrollOfs = useRef<number[]>(Array(Object.keys(pages).length).fill(0));
    useLayoutEffect(() => { scrollableNodeRef.current && (scrollableNodeRef.current.scrollTop = pageScrollOfs.current[selectedTab]); }, [selectedTab]);

    return (
        <div className="grid grid-rows-[auto,minmax(0,1fr)]">
            {/* Tabs */} {/*  As alternative to style={{ touchAction: 'none' }} we can if ref.scrollHeight != ref.scrollTop + ref.clientHeight -> show indicator */}
            <div className="px-4 pt-4 pb-2 bg-blue-900/20 flex items-center justify-between" {...dragBind()} style={{ touchAction: 'none' }}>
                <div className="flex justify-items-start space-x-1">
                    <TabSelector tabs={Object.keys(pages)}
                        active={selectedTab}
                        setActive={(v: number) => {
                            pageScrollOfs.current[selectedTab] = scrollableNodeRef.current?.scrollTop || 0;
                            setSelectedTab(v);
                        }}
                    />
                </div>
                {stateIndicator}
            </div>
            {/* Pages */}
            <div className="text-sm bg-white">
                <UISimpleBar className={`text-gray-500 overflow-auto w-full h-full`} scrollableNodeProps={{ ref: scrollableNodeRef }} autoHide={false}>
                    {Object.values(pages).map((pageContent, idx) => (
                        <Fragment key={idx}>
                            <div key={idx} className={`${selectedTab === idx ? '' : 'hidden'}`}>
                                {pageContent}
                            </div>
                        </Fragment>
                    ))}
                </UISimpleBar>
            </div>
        </div>
    );
}

export default function Manifest_FormEditor({ editorData, setShow = (v: boolean) => { } }: { editorData: EditorData; setShow?: (v: boolean) => void; }) {

    // Caption dragging

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const dragBind = useDrag(({ down, offset: [mx, my] }) => api.start({ x: mx, y: my, immediate: down }));

    // Page Web Matching

    const fileUs = useAtomValue(editorData.fileUsAtom);
    const { web_ourl: o = '', web_murl: m = '', web_qurl: q = '' } = fileUs.meta?.[editorData.formIdx]?.mani?.detection || {};
    const initial = { o, m, q, };
    const [urlsAtom] = React.useState(atomWithCallback<MatchWebState>(
        {
            ...initial,
            initial,
            dirtyAtom: atom<boolean>(false)
        },
        ({ nextValue }) => {
            console.log('urls updated', nextValue);
        }));

    // Pages

    const pages = {
        'Web': <Tab1_MatchWeb urlsAtom={urlsAtom} />,
        'Win32': <Tab2_MatchWindows editorData={editorData} />,
        'Options': <Tab3_Options editorData={editorData} />,
        'Fields': <Tab4_Fields editorData={editorData} />,
    };

    return (
        <a.div style={{ x, y }} className={classNames("w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr),auto]", "bg-gray-200 rounded overflow-hidden")}>

            {/* Editor body */}
            <EditorTabs pages={pages} stateIndicator={<ManifestState urlsAtom={urlsAtom} />} dragBind={dragBind} />

            {/* Editor footer */}
            <div className="px-4 py-4 bg-white flex items-center justify-between">
                <EditorInfo editorData={editorData} />

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
            </div>
            
        </a.div>
    );
}

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)

//TODO: check if we have forms or what we have at all (i.e. we have web, win, fields, script, or exclude manifest)
