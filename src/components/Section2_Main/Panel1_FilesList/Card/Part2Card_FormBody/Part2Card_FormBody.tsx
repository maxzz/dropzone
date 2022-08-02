import React, { useState } from 'react';
import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx, formIdxName, SelectRowAtomsType, UISize, uiSizeAtom } from '@/store';
import { classNames } from '@/utils/classnames';
import { CardNormalButtons } from '../Part1Card_Title/CardButtons';
import { Part1Form_Header } from './Part1Form_Header/Part1Form_Header';
import { Part2Form_Fields } from './Part2Form_Fields/Part2Form_Fields';

function FormContent({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formType: FormIdx; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        <div className="pt-2 font-bold border-b border-primary-400">
            {formIdxName(formType)}
        </div>

        <Part1Form_Header fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
        <Part2Form_Fields fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
    </>);
}

export function Part2Card_FormBody({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
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

    const sizeRegular = useAtomValue(uiSizeAtom) === UISize.normal;

    return (<>
        {(hasLogin || hasCpass) &&
            <div className={classNames("px-2 bg-gray-200 text-gray-800", open && "pb-2")}>

                {sizeRegular &&
                    <CardNormalButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} openAtom={openAtom} />
                }

                {open && <>
                    {hasLogin && <FormContent fileUsAtom={fileUsAtom} formType={FormIdx.login} selectRowAtoms={selectRowAtoms} />}
                    {hasCpass && <FormContent fileUsAtom={fileUsAtom} formType={FormIdx.cpass} selectRowAtoms={selectRowAtoms} />}
                </>}
            </div>
        }
    </>);
}

//TODO: add minimal, compact, and normal views
