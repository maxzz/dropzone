import React, { Fragment } from 'react';
import { restoreXml } from '../../../../store/manifest/mani-functions';
import { FileUs } from '../../../../store/store';

function PartP4({ label, part }: { label: string; part: MPath.p4[]; }) {
    return (<>
        {!!part &&
            <div>
                <div className="font-bold">{label}</div>
                <div className="mx-2 grid grid-cols-[auto,1fr]">
                    {/* overflow-x-hidden */}
                    {part.map((item, idx) => {
                        return <Fragment key={idx}>
                            {/* <div className="px-2 leading-5 border-l border-r border-t border-gray-400">{idx}</div>
                            <div className="pl-2 leading-5 border-r border-t border-gray-400">{JSON.stringify(item)}</div> */}

                            {/* <div className="px-2 leading-5 border-l border-r border-t border-gray-400">{idx}</div>
                            <div className="pl-2 min-w-0 w-full leading-5 border-r border-t border-gray-400">{JSON.stringify(item)}</div> */}

                            <div className="px-2 leading-5 border-l border-r border-t border-gray-400">{idx}</div>
                            <div className="px-4 overflow-x-hidden leading-5 border-r border-t border-gray-400"><div className="whitespace-nowrap overflow-ellipsis">{JSON.stringify(item)}</div></div>

                            {/* <div className="box-content border-l border-r border-t border-gray-400"><div className="box-content px-2 leading-5">{idx}</div></div>
                            <div className="box-content border-r border-t border-gray-400"><div className="box-content pl-2 leading-5">{JSON.stringify(item)}</div></div> */}

                        </Fragment>;
                    })}
                </div>
            </div>
        }
    </>);
}

function PartLoc({ label, part }: { label: string; part: string; }) {
    const items = part.split('|');
    return (<>
        {!!part &&
            <div>
                <div className="font-bold">{label}</div>
                <div className="">
                    {items.map((item, idx) => {
                        return <Fragment key={idx}>
                            <div>{idx}: {item}</div>
                        </Fragment>;
                    })}
                </div>
            </div>
        }
    </>);
}

function PartSid({ label, part }: { label: string; part: MPath.sid; }) {
    const items = Object.entries(part);
    return (<>
        {!!part &&
            <div>
                <div className="font-bold">{label}</div>
                <div className="">
                    {items.map(([key, val]) => {
                        return <Fragment key={key}>
                            <div>{key}: {restoreXml(val)}</div>
                        </Fragment>;
                    })}
                </div>
            </div>
        }
    </>);
}

function PartString({ label, part }: { label: string; part: any; }) {
    const text = typeof part === 'string' ? part : JSON.stringify(part, null, 4);
    return (<>
        {!!part &&
            <div>
                <div className="font-bold">{label}</div>
                <div className="">{text}</div>
            </div>
        }
    </>);
}

function FieldRowPath({ fileUs, form, field, className = '' }: { fileUs: FileUs; form: Meta.Form; field: Meta.Field; } & React.HTMLAttributes<HTMLDivElement>) {

    // p4a?: MPath.p4a[];
    // p4?: MPath.p4[];
    // loc?: string;       // "x y w h | x y w h ... | x y w h"
    // sid?: MPath.sid;
    // did2?: string;
    // sn?: MPath.sn;      // script number

    //console.log('sid', field.path, JSON.stringify(field.path.sid || ''));


    return (
        <div className="text-xs bg-gray-200 px-1">
            <div className={`max-w-[min(28rem,50vw)] max-h-[max(32rem,40vh)] overflow-auto ${className}`}>
                {field.path.p4 && <PartP4 label={'p4'} part={field.path.p4} />}
                {field.path.p4a && <PartP4 label={'p4a'} part={field.path.p4a} />}
                {field.path.loc && <PartLoc label={'loc'} part={field.path.loc} />}
                {field.path.sid && <PartSid label={'sid'} part={field.path.sid} />}
                {field.path.did2 && <PartString label={'did2'} part={field.path.did2} />}
                {field.path.sn && <PartString label={'sn'} part={field.path.sn} />}
            </div>
        </div>
    );
}

export default FieldRowPath;
