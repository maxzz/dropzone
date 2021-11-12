import { useAtom } from 'jotai';
import React from 'react';
import toast from 'react-hot-toast';
import { EditorData } from '../../store/store';
import { classNames } from '../../utils/classnames';
import { IconInfo } from '../UI/UIIcons';
import { IconAttention } from '../UI/UIIconsSymbolsDefs';
import { MatchWeb, MatchWindows, PageFields } from './EditorMatch';

function ManifestName({ editorData }: { editorData: EditorData; }) {
    const [fileUs] = useAtom(editorData.fileUsAtom);
    return (
        <div className="py-2 pb-1 text-[.65rem] text-gray-700/80 cursor-default" title="Manifest filename">{fileUs.fname}</div>
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

function EditorMatchPanels({ editorData, setShow = (v: boolean) => { } }: { editorData: EditorData; setShow?: (v: boolean) => void; }) {
    const [selected, setSelected] = React.useState(0);
    const pages = { //TODO: check if we have forms or what we have at all (i.e. we have web, win, fields, script, or exclude manifest)
        'Web': <MatchWeb editorData={editorData} />,
        'Win32': <MatchWindows editorData={editorData} />,
        'Fields': <PageFields editorData={editorData} />
    };
    return (
        <div className={classNames("w-[460px] min-h-[560px] grid grid-rows-[1fr,auto]", "bg-gray-200 rounded overflow-hidden")}>

            {/* Editor body */}
            <div className="grid grid-rows-[auto,1fr]">
                {/* Tabs */}
                <div className="px-4 pb-2 bg-blue-900/20 rounded-t">
                    <ManifestName editorData={editorData} />
                    <div className="flex justify-items-start space-x-1">
                        {Object.keys(pages).map((pageTitle, idx) => (
                            <button
                                className={classNames(
                                    'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none',
                                    selected === idx ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                                )}
                                key={pageTitle}
                                onClick={() => {
                                    setSelected(idx);
                                }}
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
                            {selected === idx &&
                                <div key={idx} className={'h-full bg-white text-sm'}>
                                    {pageContent}
                                </div>
                            }
                        </React.Fragment >
                    ))}
                </div>
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
                    >
                        OK
                    </button>
                    <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                        onClick={() => {
                            setShow(false);
                            //toast('Not yet', {style: {backgroundColor: 'tomato'}});
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    );
}

export default EditorMatchPanels;

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)
