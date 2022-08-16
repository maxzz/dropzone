import { FileUsAtomType } from '@/store';
import React from 'react';
import { Editor_FieldCatalog } from './Editor_FieldCatalog';
import { Editor_Manifest } from './Editor_Manifest';

export function Editors({ fileUsAtom }: { fileUsAtom: FileUsAtomType | undefined; }) {
    return (<>
        {fileUsAtom && <>
            <Editor_Manifest fileUsAtom={fileUsAtom} />
            {/* <Editor_FieldCatalog fileUsAtom={fileUsAtom} /> */}
        </>}
    </>);
}
