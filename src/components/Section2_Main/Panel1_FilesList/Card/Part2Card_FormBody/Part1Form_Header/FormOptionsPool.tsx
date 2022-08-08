import React, { Fragment } from 'react';
import { Transform } from '@/store/manifest';
import { DropDownButton, ToggleWithPortal } from './FormOptionsButton';

export function FormOptionsPool({ names_ext }: { names_ext: string | undefined; }) {
    if (!names_ext) {
        return <DropDownButton text={"pool"} />;
    }
    names_ext && (names_ext = Transform.persentRemove(Transform.xmlRestore(Transform.cppRestore(names_ext.replace(/:/g, '●'))))); // fix packed names
    let items = (names_ext || '').split('●');
    return (
        <ToggleWithPortal text={"pool"}>

            {/* Popup content */}
            <div className="mt-1 pl-4 pr-1 pb-1 pt-2 bg-primary-100 ring-1 ring-primary-400 rounded shadow-2xl">
                <div className="max-w-sm max-h-[40vh] text-xs overflow-auto smallscroll">
                    <div className="grid grid-cols-[auto,1fr] gap-x-2 ">
                        {items.map((item, idx) =>
                            <Fragment key={idx}>
                                <div className="px-1 text-right text-primary-400 border-r-primary-400 border-r">{idx}</div>
                                <div>{item}</div>
                            </Fragment>)
                        }
                    </div>
                </div>
            </div>

        </ToggleWithPortal>
    );
}
