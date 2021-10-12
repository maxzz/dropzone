import { stringify } from 'postcss';
import React from 'react';
import { FileUs } from '../../../../store/store';

function PathPartString({ label, part }: { label: string; part?: any; }) {
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

function PathPartArray({ label, part }: { label: string; part?: MPath.p4; }) {
    return (<>
        {!!part &&
            <div>
                <div className="font-bold">{label}</div>
                <div className="">{part}</div>
            </div>
        }
    </>);
}

function FieldRowPath({ fileUs, form, field, className = '' }: { fileUs: FileUs; form: Meta.Form; field: Meta.Field; } & React.HTMLAttributes<HTMLDivElement>) {
    //const 

    // p4a?: MPath.p4a[];
    // p4?: MPath.p4[];
    // loc?: string;       // "x y w h | x y w h ... | x y w h"
    // sid?: MPath.sid;
    // did2?: string;
    // sn?: MPath.sn;      // script number

    console.log('sid', field.path, JSON.stringify(field.path.sid || ''));
    

    return (
        <div className="text-xs bg-gray-200 px-1">
            <div className={`max-w-[min(28rem,50vw)] max-h-[max(32rem,40vh)] overflow-auto ${className}`}>
                <PathPartString label={'p4'} part={field.path.p4} />
                <PathPartString label={'p4a'} part={field.path.p4a} />
                <PathPartString label={'loc'} part={field.path.loc} />
                <PathPartString label={'sid'} part={field.path.sid} />
                <PathPartString label={'did2'} part={field.path.did2} />
                <PathPartString label={'sn'} part={field.path.sn} />
            </div>
        </div>
    );
}

export default FieldRowPath;
