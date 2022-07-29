import React, { useEffect, useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { FileUsAtomType, foldAllCardsAtom, SelectRowAtomsType } from '@/store';
import { UICardFormButton } from '../Part4_CardUI/UICardFormButton';
import { FormOptions } from './FormOptions/FormOptions';
import { FormFields } from './FormRows/FormFields';

function FormContent({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formType: number; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        <div className="pt-2 font-bold border-b border-gray-400">{formType === 0 ? "Login form" : "Password change form"}</div>
        <FormOptions fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
        <FormFields fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
    </>);
}

export function Part2_CardBody({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [open, setOpen] = useState(false);
    const openAll = useAtomValue(foldAllCardsAtom);
    const [selectRowAtoms] = useState<SelectRowAtomsType>({
        loginAtom: atom({ field: -1, form: -1 }),
        cpassAtom: atom({ field: -1, form: -1 }),
    });
    const Toogle = () => setOpen((v) => !v);

    useEffect(() => {
        if (openAll >= 0) {
            const collapse = openAll % 2 === 0;
            setOpen(collapse);
        }
    }, [openAll]);

    const fileUs = useAtomValue(fileUsAtom);
    const nForms = fileUs.mani?.forms.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;
    const disp = (type: number) => fileUs?.meta?.[type].disp;

    return (
        <>{(hasLogin || hasCpass) &&
            <div className="p-2 bg-gray-200 text-gray-800">
                <div className="flex items-center space-x-2 text-sm">
                    {hasLogin && <UICardFormButton disp={disp(0)} opened={open} onClick={Toogle} label="Login form" />}
                    {hasCpass && <UICardFormButton disp={disp(1)} opened={open} onClick={Toogle} label="Password change form" />}
                </div>
                {hasLogin && open && (<FormContent fileUsAtom={fileUsAtom} formType={0} selectRowAtoms={selectRowAtoms} />)}
                {hasCpass && open && (<FormContent fileUsAtom={fileUsAtom} formType={1} selectRowAtoms={selectRowAtoms} />)}
            </div>
        }</>
    );
}
