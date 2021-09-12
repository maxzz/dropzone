import { useAtom } from 'jotai';
import React from 'react';
import { urlDomain } from '../store/manifest/url';
import { filesAtom, FileUsAtom } from '../store/store';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAutoMode, IconFormChangePsw, IconFormLogin, IconManualMode } from './Icons';

function removeQuery(url: string | undefined): string {
    return (url || '').split('?')[0].split('#')[0];
}

function ManifestCard({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);

    let loginTitle;
    let loginDomain;
    let loginForms;

    if (fileUs.mani) {
        const mani = fileUs.mani;
        loginTitle = mani.forms[0]?.detection?.caption;

        loginForms = mani.forms?.map((form, idx) => {
            loginDomain = urlDomain(removeQuery(form.detection?.web_ourl));
            return `Form ${idx}: ${loginDomain}`;
        });
    }

    return (
        <div className="min-w-[450px] max-w-[560px] grid grid-rows-[auto,1fr] ring-1 ring-gray-400 overflow-hidden rounded shadow-md">

            {/* Card title */}
            <div className="p-2 bg-gray-800 text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis">
                <div className="">
                    <div className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {loginDomain || 'Windows application'}
                    </div>
                    <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {loginTitle || 'No title'}
                    </div>
                </div>
            </div>

            {/* Card body */}
            <div className="p-2 grid grid-cols-[auto,1fr] gap-2 bg-gray-200 text-gray-800">

                {/* Card body 1st col */}
                <div className="flex flex-col items-center">
                    <div className="w-5 h-5">
                        {/* {fileUs.cnt && <IconAppWindows />} */}
                        {fileUs.raw && <IconAppWebIE />}
                        {/* {fileUs.cnt && <IconManualMode />} */}
                    </div>
                    <div className="w-4 h-4">
                        {fileUs.raw && <IconAppWebChrome strokeWidth={.9} />}
                        {/* {fileUs.cnt && <IconAutoMode />} */}
                    </div>
                </div>

                {/* Card body 2nd col */}
                <div className="grid gap-y-2">
                    {/* Card body 2nd col: filename */}
                    <div className="">{fileUs.name}</div>
                    {/* Card body 2nd col: forms */}
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
        <div className="grid auto-cols-auto gap-4 text-sm">
            {files.map((atom) =>
                <ManifestCard atom={atom} key={`${atom}`} />
            )}
        </div>
    );
}
export default FilesList;
