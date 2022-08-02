import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { allCards, FileUsAtomType, FormIdx, SelectRowAtomsType, UISize, uiSizeAtom } from '@/store';
import { UICardFormButton, UICardFormMediumButton } from '../Part4_CardUI/UICardFormButton';
import { Part1_FormHeader } from './Part1_FormHeader/Part1_FormHeader';
import { Part2_FormFields } from './Part2_FormFields/Part2_FormFields';

function FormContent({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formType: number; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        <div className="pt-2 font-bold border-b border-gray-400">
            {formType === 0 ? "Login form" : "Password change form"}
        </div>

        <Part1_FormHeader fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
        <Part2_FormFields fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
    </>);
}

function CardNormalButtons({ hasLogin, hasCpass, disp, state }: { hasLogin: boolean; hasCpass: boolean; disp: Array<Meta.Disp | undefined>; state: [boolean, Dispatch<SetStateAction<boolean>>]; }) {
    const [formsExpanded, setFormsExpanded] = state;
    const toogleFormsExpanded = () => setFormsExpanded((v) => !v);
    return (
        <div className="flex items-center space-x-2 text-sm">
            {hasLogin && <UICardFormButton disp={disp[0]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.login} />}
            {hasCpass && <UICardFormButton disp={disp[1]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.cpass} />}
        </div>
    );
}

function CardMediumButtons({ hasLogin, hasCpass, disp, state }: { hasLogin: boolean; hasCpass: boolean; disp: Array<Meta.Disp | undefined>; state: [boolean, Dispatch<SetStateAction<boolean>>]; }) {
    const [formsExpanded, setFormsExpanded] = state;
    const toogleFormsExpanded = () => setFormsExpanded((v) => !v);
    return (
        <div className="flex items-center space-x-2 text-sm">
            {hasLogin && <UICardFormMediumButton disp={disp[0]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.login} />}
            {hasCpass && <UICardFormMediumButton disp={disp[1]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.cpass} />}
        </div>
    );
}

export function Part2_CardBody({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [formsExpanded, setFormsExpanded] = useState(false);
    const toogleFormsExpanded = () => setFormsExpanded((v) => !v);

    const allOpenCounter = useAtomValue(allCards.areFoldedCounterAtom);
    useEffect(() => {
        if (allOpenCounter >= 0) {
            const collapse = allOpenCounter % 2 === 0;
            setFormsExpanded(collapse);
        }
    }, [allOpenCounter]);

    const fileUs = useAtomValue(fileUsAtom);
    const nForms = fileUs.mani?.forms.length || 0;
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
            <div className="p-2 bg-gray-200 text-gray-800">

                {/* Buttons */}
                {uiSize === UISize.regular ?
                    <CardNormalButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} state={[formsExpanded, setFormsExpanded]} />
                    // <div className="flex items-center space-x-2 text-sm">
                    //     {hasLogin && <UICardFormButton disp={disp(0)} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.login} />}
                    //     {hasCpass && <UICardFormButton disp={disp(1)} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.cpass} />}
                    // </div>
                    :
                    <CardMediumButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} state={[formsExpanded, setFormsExpanded]} />
                    // <div className="flex items-center space-x-2 text-sm">
                    //     {hasLogin && <UICardFormMediumButton disp={disp(0)} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.login} />}
                    //     {hasCpass && <UICardFormMediumButton disp={disp(1)} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.cpass} />}
                    // </div>
                }

                {/* Forms */}
                {hasLogin && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={0} selectRowAtoms={selectRowAtoms} />)}
                {hasCpass && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={1} selectRowAtoms={selectRowAtoms} />)}
            </div>
        }
    </>);
}

//TODO: add minimal, compact, and normal views

/*

*/