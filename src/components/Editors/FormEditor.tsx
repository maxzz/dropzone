import React from 'react';
import { atom, useAtom } from 'jotai';
import { EditorData } from '../../store/store';
import { classNames } from '../../utils/classnames';
import { IconInfo } from '../UI/UIIcons';
import { IconAttention } from '../UI/UIIconsSymbolsDefs';
import { toastWarning } from '../UI/UIToasts';
import { TabMatchWindows, TabFields } from './Tabs';
import { MatchWebState, TabMatchWeb } from './TabMatching';
import { useAtomValue } from 'jotai/utils';
import atomWithCallback from '../../hooks/atomsX';

function EditorCaption({ editorData }: { editorData: EditorData; }) {
    const [fileUs] = useAtom(editorData.fileUsAtom);
    return (
        <div className="px-4 py-2 pb-1 text-[.65rem] text-gray-700/80 bg-blue-900/20 rounded-t cursor-default" title="Manifest filename">{fileUs.fname}</div>
    );
}

function ManifestStateButtons({ editorData }: { editorData: EditorData; }) {
    const [fileUs] = useAtom(editorData.fileUsAtom);
    return (
        <>
            <IconInfo className="w-7 h-7 text-gray-500" strokeWidth={1.7} title={`Filename: ${fileUs.fname}`} />
            <IconAttention className="w-6 h-6 text-yellow-500" title="Modified" />
        </>
    );
}

function EditorTabs({pages}: {pages: Record<string, JSX.Element>}) {
    const [selectedTab, setSelectedTab] = React.useState(0);
    return (<>
        {/* Tabs */}
        <div className="px-4 pb-2 bg-blue-900/20 ">
            <div className="flex justify-items-start space-x-1">
                {Object.keys(pages).map((pageTitle, idx) => (
                    <button
                        className={classNames(
                            'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none',
                            selectedTab === idx ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                        )}
                        style={{filter: 'drop-shadow(#0000003f 0px 0px 0.15rem)'}}
                        key={pageTitle}
                        onClick={() => setSelectedTab(idx)}
                    >
                        {pageTitle}
                    </button>
                ))}
            </div>
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
    const [urlsAtom] = React.useState(atomWithCallback<MatchWebState>({ ...initial, initial, dirtyAtom: atom<boolean>(false) }, ({ nextValue }) => {
        console.log('updated', nextValue);
    }));
    const [urls] = useAtom(urlsAtom)
    const [dirty] = useAtom(urls.dirtyAtom);

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
                <EditorTabs pages={pages} />
            </div>

            {/* Editor buttons */}
            <div className="px-4 py-4 flex justify-between bg-white">

                <div className="flex items-center space-x-0.5">
                    <ManifestStateButtons editorData={editorData} />
                </div>

                <div className="flex space-x-2">
                    <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                        onClick={() => {
                            setShow(false);
                        }}
                    >OK</button>
                    <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                        onClick={() => {
                            setShow(false);
                            toastWarning(<div><div className="font-bold">Not implemented</div><div className="">yet</div></div>, {style: {backgroundColor: 'tomato'}});
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
