import { useAtom } from 'jotai';
import React from 'react';
import { filesAtom, FileUsAtom } from '../store/store';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAutoMode, IconFormChangePsw, IconFormLogin, IconManualMode } from './Icons';

function debugUrl(url: string | undefined): string {
    return (url || '').split('?')[0];
}

function GridRow({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);

    let loginTitle;
    let loginForms;

    if (fileUs.mani) {
        const mani = fileUs.mani;
        loginTitle = mani.forms[0]?.detection?.caption;

        loginForms = mani.forms?.map((form, idx) => {
            return `Form ${idx}: ${debugUrl(form.detection?.web_ourl)}`;
        });
    }

    return (
        <div className="grid grid-rows-[auto,1fr] border border-green-700 rounded shadow-md">

            {/* Card title */}
            <div className="p-2 bg-green-800">
                {loginTitle || 'No title'}
            </div>

            {/* Card body */}
            <div className="p-2 grid grid-cols-[auto,1fr] gap-2">

                {/* 1st col */}
                <div className="flex flex-col">
                    <div className="w-4 h-4">
                        {/* {fileUs.cnt && <IconAppWindows />} */}
                        {fileUs.raw && <IconAppWebIE />}
                        {/* {fileUs.cnt && <IconManualMode />} */}
                    </div>
                    <div className="w-4 h-4">
                        {fileUs.raw && <IconAppWebChrome strokeWidth={.9} />}
                        {/* {fileUs.cnt && <IconAutoMode />} */}
                    </div>
                </div>

                {/* 2nd col */}
                <div className="grid gap-y-2">
                    <div className="">{fileUs.name}</div>
                    <div className="overflow-hidden">
                        {loginForms && loginForms.map((f, idx) => (
                            <div className="flex" key={idx}>
                                <div className="w-4 h-4 p-0.5 mr-1 flex-none">
                                    {idx === 0 ? <IconFormLogin /> : <IconFormChangePsw />}
                                </div>
                                <div className="overflow-x-auto smallscroll">{f}</div>
                            </div>)
                        )}
                    </div>
                    {/* <div className="">{fileUs.size} bytes</div> */}
                </div>
                {/* <div className="">{fileUs.cnt}</div> */}
            </div>
        </div>
    );
}

function FilesList() {
    const [files] = useAtom(filesAtom);
    return (
        <div className="p-4 grid  gap-x-1 gap-y-2 text-xs">
            {files.map((atom) =>
                <GridRow atom={atom} key={`${atom}`} />
            )}
        </div>
    );
}
export default FilesList;
