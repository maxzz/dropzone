import { FileUs } from '@/store';
import { Meta } from '@/store/manifest';

export type DispArrForTwoForm = readonly [boolean, Meta.Disp | undefined][];

export function getDispArrForTwoForms(fileUs: FileUs): DispArrForTwoForm {

    function formDispInfo(formType: number): Meta.Disp | undefined {
        return fileUs?.meta?.[formType]?.disp;
    }

    const nForms = fileUs.mani?.forms?.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;

    return [[hasLogin, formDispInfo(0)], [hasCpass, formDispInfo(1)]];
}
