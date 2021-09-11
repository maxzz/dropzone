import { useAtom } from 'jotai';
import React from 'react';
import { filesAtom, FileUsAtom } from '../store/store';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAutoMode, IconFormChangePsw, IconFormLogin, IconManualMode } from './Icons';

function GridRow({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);

    let loginTitle;
    let loginForms;

    if (fileUs.mani) {
        const mani = fileUs.mani;
        loginTitle = mani.forms[0]?.detection?.caption;

        loginForms = mani.forms?.map((form, idx) => {
            return `Form ${idx}: ${form.detection?.web_ourl}`;
        });
    }

    return (
        <React.Fragment key={fileUs.id}>
            <div className="w-4 h-4">
                {/* {fileUs.cnt && <IconAppWindows />} */}
                {fileUs.raw && <IconAppWebIE />}
                {/* {fileUs.cnt && <IconManualMode />} */}
            </div>
            <div className="w-4 h-4">
                {fileUs.raw && <IconAppWebChrome strokeWidth={.9} />}
                {/* {fileUs.cnt && <IconAutoMode />} */}
            </div>
            <div className="grid">
                <div className="">{loginTitle}</div>
                <div className="">{fileUs.name}</div>
                <div className="mt-2 ml-4">
                    {loginForms && loginForms.map((f, idx) => (
                        <div className="flex">
                            <div className="w-4 h-4">
                            {idx === 0 ? <IconFormLogin /> : <IconFormChangePsw />}
                            </div>
                            {f}
                        </div>)
                    )}
                </div>
                {/* <div className="">{fileUs.size} bytes</div> */}
            </div>
            {/* <div className="">{fileUs.cnt}</div> */}
        </React.Fragment>
    );
}

function FilesList() {
    const [files] = useAtom(filesAtom);
    return (
        <div className="p-4 border border-green-700 grid grid-cols-[auto,auto,1fr] items-center gap-x-1 gap-y-2 text-xs">
            {files.map((atom) =>
                <GridRow atom={atom} key={`${atom}`} />
            )}
        </div>
    );
}
export default FilesList;
