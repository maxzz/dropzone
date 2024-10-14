import { FldCatDlg } from './dlg-fld-catalog';
import { ManifestOldDlgTrigger } from './dlg-manifest-old';

export function Section4_Dialogs() {
    return (<>
        <ManifestOldDlgTrigger />
        <FldCatDlg />
    </>);
}
