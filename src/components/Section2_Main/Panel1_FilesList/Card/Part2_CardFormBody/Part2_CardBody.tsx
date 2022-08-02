import React, { useState } from 'react';
import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx, formIdxName, SelectRowAtomsType, UISize, uiSizeAtom } from '@/store';
import { classNames } from '@/utils/classnames';
import { CardNormalButtons } from '../Part1_CardTitle/CardButtons';
import { Part1_FormHeader } from './Part1_FormHeader/Part1_FormHeader';
import { Part2_FormFields } from './Part2_FormFields/Part2_FormFields';

function FormContent({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formType: FormIdx; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        <div className="pt-2 font-bold border-b border-primary-400">
            {formIdxName(formType)}
        </div>

        <Part1_FormHeader fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
        <Part2_FormFields fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
    </>);
}

function FormsContent({ fileUsAtom, hasLogin, hasCpass, open, selectRowAtoms }: { fileUsAtom: FileUsAtomType; hasLogin: boolean; hasCpass: boolean; open: boolean; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        {hasLogin && open && (<FormContent fileUsAtom={fileUsAtom} formType={FormIdx.login} selectRowAtoms={selectRowAtoms} />)}
        {hasCpass && open && (<FormContent fileUsAtom={fileUsAtom} formType={FormIdx.cpass} selectRowAtoms={selectRowAtoms} />)}
    </>);
}

export function Part2_CardFormBody({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const open = useAtomValue(openAtom);

    const fileUs = useAtomValue(fileUsAtom);
    const nForms = fileUs.mani?.forms?.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;
    const disp = (type: number) => fileUs?.meta?.[type]?.disp;

    const [selectRowAtoms] = useState<SelectRowAtomsType>({
        loginAtom: atom({ field: -1, form: -1 }),
        cpassAtom: atom({ field: -1, form: -1 }),
    });

    const sizeRegular = useAtomValue(uiSizeAtom) === UISize.regular;

    return (<>
        {(hasLogin || hasCpass) &&
            <div className={classNames("px-2 bg-gray-200 text-gray-800", open && "pb-2")}>

                {sizeRegular &&
                    <CardNormalButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} openAtom={openAtom} />
                }

                <FormsContent fileUsAtom={fileUsAtom} hasLogin={hasLogin} hasCpass={hasCpass} open={open} selectRowAtoms={selectRowAtoms} />
            </div>
        }
    </>);
}

//TODO: add minimal, compact, and normal views
