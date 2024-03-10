import React, { Fragment } from 'react';
import { useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import { Scroller } from '../Scroller';
import { fieldIcons } from '@/store/manifest/manifest-field-icons';

function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, }) || <div className="text-red-500">nan</div>;
    return Icon;
}

export function Body_FieldCatalog({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [fileUs] = useAtom(fileUsAtom);
    const names = fileUs.fcat?.names || [];
    return (
        <div className="grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
            <div className="px-4 py-3 text-xs text-primary-400 bg-primary-800 border-primary-700 border-b">
                {/* filters */}
                {names.length} item{names.length === 1 ? '' : 's'}
            </div>

            <Scroller className="pt-2 text-xs text-primary-100">
                <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] gap-x-4 text-primary-400">
                    <div className="col-start-2 mb-2 text-[.65rem] text-right text-primary-400 border-primary-100 border-b select-none">#</div>
                    {/* <div className="col-start-3 mb-2 text-[.65rem] text-primary-400 border-primary-100 border-b select-none">Type</div> */}
                    <div className="col-start-3 mb-2 text-[.65rem] text-primary-400 border-primary-100 border-b select-none">Name</div>
                    <div className="col-start-4 mb-2 text-[.65rem] text-primary-400 border-primary-100 border-b select-none">ID</div>
                    {names.map((item, idx) => (
                        <Fragment key={idx}>
                            <div className="col-start-2 text-right">{idx + 1}</div>
                            <div className="col-start-3 flex items-center gap-x-2 leading-[18px]">
                                {FieldIcon(item.password, "w-4 h-4 opacity-25")}
                                <div className="">{item.dispname}</div>
                            </div>
                            <div className="col-start-4 font-mono text-[.6rem]">{item.dbname}</div>
                        </Fragment>
                    ))}
                </div>
            </Scroller>
        </div>
    );
}

//TODO: # of items
//TODO: sort controls
//TODO: separate edit/psw and buttons
