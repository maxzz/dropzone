import React, { Fragment } from 'react';
import { useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';

export function Editor_FieldCatalog({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [fileUs] = useAtom(fileUsAtom);
    const names = fileUs.fcat?.names || [];
    return (
        <div className="grid grid-cols-2 text-primary-400">
            {names.map((item, idx) => (
                <Fragment key={idx}>
                    <div className="">{item.dispname}</div>
                    <div className="font-mono text-[.6rem]" key={idx}>{item.dbname}</div>
                </Fragment>
            ))}
        </div>
    );
}
