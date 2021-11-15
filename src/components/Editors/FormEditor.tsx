import React from 'react';
import { atom, useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import atomWithCallback from '../../hooks/atomsX';
import { EditorData } from '../../store/store';
import { appStats, formIdxName } from '../../store/store-functions';
import { classNames } from '../../utils/classnames';
import { IconInfo } from '../UI/UIIcons';
import { IconAttention } from '../UI/UIIconsSymbolsDefs';
import { toastWarning } from '../UI/UIToasts';
import { UITooltip } from '../UI/UITooltip';
import { TabMatchWindows, TabFields } from './Tabs';
import { MatchWebState, MatchWebStateAtom, TabMatchWeb } from './TabMatching';
import { parsedFname } from '../Card/CardTitle';

function EditorCaption({ editorData }: { editorData: EditorData; }) {
    const [fileUs] = useAtom(editorData.fileUsAtom);
    //<div className="px-4 py-2 pb-1 text-[.65rem] text-gray-700/80 bg-blue-900/20 rounded-t cursor-default" title="Manifest filename">{fileUs.fname}</div>
    return (
        <div className="px-4 py-2 pb-2 text-[.65rem] text-gray-700/80 bg-blue-900/20 rounded-t cursor-default">
            {/* {`${formIdxName(editorData.formIdx)} form from ${fileUs.fname}`} */}
        </div>
    );
}

function EditorInfo({ editorData }: { editorData: EditorData; }) {
    const [fileUs] = useAtom(editorData.fileUsAtom);
    const stats = appStats(fileUs);
    const formName = `${formIdxName(editorData.formIdx)} form`;
    const fname = parsedFname({ fname: fileUs.fname, styleLg: "px-1 text-[.65rem] font-bold text-gray-600 opacity-100" });
    return (<>
        <UITooltip trigger={<IconInfo className="w-7 h-7 text-gray-300" strokeWidth={1.7} />} arrow={true}>
            <div className="text-xs grid grid-cols-[auto,1fr] gap-x-2">
                <div className="font-bold">Filename</div>
                <div className="">{fname}</div>

                {stats.domain && <>
                    <div className="font-bold">Domain</div>
                    <div className="">{stats.domain}</div>
                </>}

                <div className="font-bold">Form</div>
                <div className="">{formName}</div>
            </div>
        </UITooltip>
    </>);
}

function ManifestState({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls] = useAtom(urlsAtom);
    const [dirty] = useAtom(urls.dirtyAtom);
    return (<>
        {dirty && <IconAttention className="w-6 h-6 text-red-100" style={{ filter: 'drop-shadow(#ff0000af 0px 0px 0.05rem)' }} title="Modified" />}
    </>);
}

function EditorTabs({ pages, stateIndicator }: { pages: Record<string, JSX.Element>; stateIndicator: JSX.Element; }) {
    const [selectedTab, setSelectedTab] = React.useState(0);
    return (<>
        {/* Tabs */}
        <div className="px-4 pb-2 bg-blue-900/20 flex items-center justify-between">
            <div className="flex justify-items-start space-x-1">
                {Object.keys(pages).map((pageTitle, idx) => (
                    <button
                        className={classNames(
                            'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none',
                            selectedTab === idx ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                        )}
                        style={{ filter: 'drop-shadow(#0000003f 0px 0px 0.15rem)' }}
                        key={pageTitle}
                        onClick={() => setSelectedTab(idx)}
                    >
                        {pageTitle}
                    </button>
                ))}
            </div>
            {stateIndicator}
        </div>
        {/* Pages */}
        <div>
            {Object.values(pages).map((pageContent, idx) => (
                <React.Fragment key={idx}>
                    <div key={idx} className={`h-full bg-white text-sm ${selectedTab === idx ? '' : 'hidden'}`}>
                        {pageContent}
                    </div>
                </React.Fragment >
            ))}
        </div>
    </>);
}

function FormEditor({ editorData, setShow = (v: boolean) => { } }: { editorData: EditorData; setShow?: (v: boolean) => void; }) {

    // Page Web Matching

    const fileUs = useAtomValue(editorData.fileUsAtom);
    const { web_ourl: o = '', web_murl: m = '', web_qurl: q = '' } = fileUs.meta?.[editorData.formIdx]?.mani?.detection || {};
    const initial = { o, m, q, };
    const [urlsAtom] = React.useState(atomWithCallback<MatchWebState>({ ...initial, initial, dirtyAtom: atom<boolean>(false) },
        ({ nextValue }) => {
            console.log('urls updated', nextValue);
        }));

    // Pages

    const pages = { //TODO: check if we have forms or what we have at all (i.e. we have web, win, fields, script, or exclude manifest)
        'Web': <TabMatchWeb urlsAtom={urlsAtom} />,
        'Win32': <TabMatchWindows editorData={editorData} />,
        'Fields': <TabFields editorData={editorData} />
    };

    return (
        <div className={classNames("w-[460px] min-h-[640px] grid grid-rows-[1fr,auto]", "bg-gray-200 rounded overflow-hidden")}>
            {/* Editor body */}
            <div className="grid grid-rows-[auto,auto,1fr]">
                <EditorCaption editorData={editorData} />
                <EditorTabs pages={pages} stateIndicator={<ManifestState urlsAtom={urlsAtom} />} />
            </div>

            {/* Editor buttons */}
            <div className="px-4 py-4 flex justify-between bg-white">
                <EditorInfo editorData={editorData} />

                <div className="flex space-x-2">
                    <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                        onClick={() => {
                            setShow(false);
                            toastWarning(<div><div className="font-bold">Not implemented</div><div className="">yet</div></div>, { style: { backgroundColor: 'tomato' } });
                        }}
                    >OK</button>
                    <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                        onClick={() => {
                            setShow(false);
                        }}
                    >Cancel</button>
                </div>
            </div>

        </div>
    );
}

export default FormEditor;

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)
