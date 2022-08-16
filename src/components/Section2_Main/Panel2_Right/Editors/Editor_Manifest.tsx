import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import SelectDemo from './UISelect';

export function Editor_Manifest({fileUsAtom}: {fileUsAtom: FileUsAtomType}) {
    const [fileUs] = useAtom(fileUsAtom);
    return (
        <div>
            List_Manifest
            <SelectDemo/>
        </div>
    );
}
