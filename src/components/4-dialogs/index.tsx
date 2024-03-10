import React from 'react';
import { ManifestOldDlgTrigger } from './dlg-manifest-old';
import { FldCatDlg } from './dlg-fld-catalog';

export function Section4_Dialogs() {
    return (<>
        <ManifestOldDlgTrigger />
        <FldCatDlg />
    </>);
}
