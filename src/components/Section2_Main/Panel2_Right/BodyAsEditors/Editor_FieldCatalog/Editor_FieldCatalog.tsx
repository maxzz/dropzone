import React, { Fragment } from 'react';
import { useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import { Scroller } from '../../Scroller';

export function Editor_FieldCatalog({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [fileUs] = useAtom(fileUsAtom);
    const names = fileUs.fcat?.names || [];
    return (
        <div className="grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
            <div className="h-8 bg-primary-800">
                filters
            </div>

            <Scroller className="text-xs text-primary-100">
                <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] gap-x-4 text-primary-400">
                    <div className="col-start-2 mb-2 text-[.65rem] text-right text-primary-400 border-primary-100 border-b select-none">#</div>
                    <div className="col-start-3 mb-2 text-[.65rem] text-primary-400 border-primary-100 border-b select-none">Name</div>
                    <div className="col-start-4 mb-2 text-[.65rem] text-primary-400 border-primary-100 border-b select-none">ID</div>
                    {names.map((item, idx) => (
                        <Fragment key={idx}>
                            <div className="col-start-2 text-right">{idx}</div>
                            <div className="col-start-3">{item.dispname}</div>
                            <div className="col-start-4 font-mono text-[.6rem]" key={idx}>{item.dbname}</div>
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
