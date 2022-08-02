import React, { useEffect, useState } from 'react';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { allCards, FileUsAtomType, SelectRowAtomsType, UISize, uiSizeAtom } from '@/store';
import { CardMediumButtons, CardNormalButtons } from '../Part1_CardTitle/CardButtons';
import { Part1_FormHeader } from './Part1_FormHeader/Part1_FormHeader';
import { Part2_FormFields } from './Part2_FormFields/Part2_FormFields';
import { classNames } from '@/utils/classnames';

function FormContent({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formType: number; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        <div className="pt-2 font-bold border-b border-gray-400">
            {formType === 0 ? "Login form" : "Password change form"}
        </div>

        <Part1_FormHeader fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
        <Part2_FormFields fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
    </>);
}

function FormsContent({ fileUsAtom, hasLogin, hasCpass, formsExpanded, selectRowAtoms }: { fileUsAtom: FileUsAtomType; hasLogin: boolean; hasCpass: boolean; formsExpanded: boolean; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        {hasLogin && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={0} selectRowAtoms={selectRowAtoms} />)}
        {hasCpass && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={1} selectRowAtoms={selectRowAtoms} />)}
    </>);
}

export function Part2_CardFormBody({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const [formsExpanded, setFormsExpanded] = useAtom(openAtom);

    const allOpenCounter = useAtomValue(allCards.areFoldedCounterAtom);
    useEffect(() => {
        if (allOpenCounter >= 0) {
            const collapse = allOpenCounter % 2 === 0;
            setFormsExpanded(collapse);
        }
    }, [allOpenCounter]);

    const fileUs = useAtomValue(fileUsAtom);
    const nForms = fileUs.mani?.forms?.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;
    const disp = (type: number) => fileUs?.meta?.[type]?.disp;

    const [selectRowAtoms] = useState<SelectRowAtomsType>({
        loginAtom: atom({ field: -1, form: -1 }),
        cpassAtom: atom({ field: -1, form: -1 }),
    });

    const uiSize = useAtomValue(uiSizeAtom);

    return (<>
        {(hasLogin || hasCpass) &&
            <div className={classNames("bg-gray-200 text-gray-800", (hasLogin || hasCpass) && (uiSize === UISize.regular) && "p-2")}>

                {/* Buttons */}
                {/* {uiSize === UISize.regular
                    ? <CardNormalButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} openAtom={openAtom} />
                    : <CardMediumButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} openAtom={openAtom} />
                } */}
                {uiSize === UISize.regular
                    && <CardNormalButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} openAtom={openAtom} />
                }

                {/* Forms */}
                <FormsContent fileUsAtom={fileUsAtom} hasLogin={hasLogin} hasCpass={hasCpass} formsExpanded={formsExpanded} selectRowAtoms={selectRowAtoms} />
            </div>
        }
    </>);
}

//TODO: add minimal, compact, and normal views
