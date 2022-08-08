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
            <div className="mt-1 px-4 bg-primary-100 ring-1 ring-primary-400 rounded">
                <div className="px-2 text-xs max-w-sm max-h-[40vh] overflow-auto shadow-2xl">
                    <div className="grid grid-cols-[auto,1fr] gap-x-2 ">
                        {items.map((item, idx) =>
                            <Fragment key={idx}>
                                <div className="px-1 text-right border-r border-r-primary-400">{idx}</div>
                                <div className="">{item}</div>
                            </Fragment>)
                        }
                    </div>
                </div>
            </div>

        </ToggleWithPortal>
    );
}
