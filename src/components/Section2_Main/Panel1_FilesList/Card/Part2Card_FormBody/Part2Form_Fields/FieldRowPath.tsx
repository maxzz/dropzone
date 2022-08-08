import React, { Fragment, ReactNode } from 'react';
import { Transform } from '@/store/manifest';

function Section({ label }: { label: ReactNode; }) {
    return (
        <div className="pt-2 pb-1 font-bold flex">
            <div className="px-2 py-1 bg-primary-300 rounded">
                {label}
            </div>
        </div>
    );
}

function Part_P4({ part, label }: { part: MPath.p4[]; label: string; }) {

    function beautifyHint(item: MPath.p4a): string {
        return `Role #: ${item.rnumber} | Role: ${item.roleString} | Classname: "${item.className}" | Name: "${item.name}"`;
    }

    function beautifyVal(item: MPath.p4a): string {
        return `${item.className} | ${item.name}`;
    }

    return (<>
        {!!part &&
            <div>
                <Section label={label} />
                <div className="mx-2 grid grid-cols-[auto,1fr] border-b border-b-primary-400">
                    {/* overflow-x-hidden */}
                    {part.map((item, idx) => {
                        return <Fragment key={idx}>
                            {/* <div className="px-2 leading-5 border-l border-r border-t border-primary-400">{idx}</div>
                            <div className="pl-2 leading-5 border-r border-t border-primary-400">{JSON.stringify(item)}</div> */}

                            {/* <div className="px-2 leading-5 border-l border-r border-t border-primary-400">{idx}</div>
                            <div className="pl-2 min-w-0 w-full leading-5 border-r border-t border-primary-400">{JSON.stringify(item)}</div> */}

                            {/* <div className="box-content border-l border-r border-t border-primary-400"><div className="box-content px-2 leading-5">{idx}</div></div>
                            <div className="box-content border-r border-t border-primary-400"><div className="box-content pl-2 leading-5">{JSON.stringify(item)}</div></div> */}

                            <div className="px-2 leading-5 border-l border-r border-t border-primary-400">{idx}</div>
                            <div className="px-2 overflow-x-hidden leading-5 border-r border-t border-primary-400" title={beautifyHint(item)}>
                                <div className="overflow-x-hidden whitespace-nowrap overflow-ellipsis">
                                    {beautifyVal(item)}
                                </div>
                            </div>

                        </Fragment>;
                    })}
                </div>
            </div>
        }
    </>);
}

function PartLoc({ part, label }: { part: string; label: string; }) {
    const items = part.split('|');

    function beautifyRect(item: string) {
        return item.split(' ');
    }
    
    return (<>
        {!!part &&
            <div>
                <Section label={<div className="flex space-x-2">
                    <div>{label}</div>
                    <div className="font-normal">(x, y; w x h)</div>
                </div>} />

                <div className="mx-2 grid grid-cols-[repeat(5,min-content)] gap-x-2">
                    {items.map((item, idx) => {
                        return <Fragment key={idx}>
                            <div>{idx}:</div>
                            {beautifyRect(item).map((pt, idx) => (
                                <div className="text-right" key={idx}>
                                    {pt}
                                </div>
                            ))}
                        </Fragment>;
                    })}
                </div>
            </div>
        }
    </>);
}

function PartSid({ part, label }: { part: MPath.sid; label: string; }) {
    const { version, ...rest } = part;
    part = { ...rest, version };
    const items = Object.entries(part);
    return (<>
        {!!part &&
            <div>
                <Section label={label} />
                <div className="mx-2">
                    {items.map(([key, val]) => {
                        return <Fragment key={key}>
                            <div>{key}: {Transform.xmlRestore(val) || `""`}</div>
                        </Fragment>;
                    })}
                </div>
            </div>
        }
    </>);
}

function PartStr({ part, label }: { part: string | object; label: string; }) {
    const text = typeof part === 'string' ? part : JSON.stringify(part, null, 4);
    return (<>
        {!!part &&
            <div>
                <Section label={label} />
                <div className="">{text}</div>
            </div>
        }
    </>);
}

export function FieldRowPath({ field }: { field: Meta.Field; }) {
    const { sid, did2: dd2, p4: p4_, p4a, loc, sn: sn_, } = field.path;
    return (
        <div className="w-[28rem] bg-primary-100 rounded p-0.5 border border-primary-700">
            <div className="pl-4 pb-1 text-xs bg-primary-100">
                <div className={"pr-2 max-w-[min(28rem,50vw)] max-h-[max(32rem,40vh)] overflow-auto smallscroll"}>
                    {sid && <PartSid part={sid} label={'sid'} />}
                    {dd2 && <PartStr part={dd2} label={'did2'} />}
                    {p4_ && <Part_P4 part={p4_} label={'p4'} />}
                    {p4a && <Part_P4 part={p4a} label={'p4a'} />}
                    {loc && <PartLoc part={loc} label={'loc'} />}
                    {sn_ && <PartStr part={sn_} label={'sn'} />}
                </div>
            </div>
        </div>
    );
}
