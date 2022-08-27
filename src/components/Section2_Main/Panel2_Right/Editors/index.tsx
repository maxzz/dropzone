import { FileUsAtomType } from '@/store';
import { useAtomValue } from 'jotai';
import React from 'react';
import { Editor_FieldCatalog } from './Editor_FieldCatalog/Editor_FieldCatalog';
import { Editor_Manifest } from './Editor_Manifest/Editor_Manifest';

export function Editors({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    return (
        !fileUs.meta
            ? <></>
            : fileUs.fcat
                ? <Editor_FieldCatalog fileUsAtom={fileUsAtom} />
                : <Editor_Manifest fileUsAtom={fileUsAtom} />);
}
