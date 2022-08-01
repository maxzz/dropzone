import React, { HTMLAttributes, SVGProps, useEffect, useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { allCards, FileUsAtomType, SelectRowAtomsType } from '@/store';
import { UICardFormButton } from '../Part4_CardUI/UICardFormButton';
import { Part1_FormHeader } from './Part1_FormHeader/Part1_FormHeader';
import { Part2_FormFields } from './Part2_FormFields/Part2_FormFields';
import { IconFormChange, IconFormLogin } from '@ui/UIIconSymbols';
import { IconBtnFormChangePsw, IconBtnFormLogin } from '@ui/UIIcons';

//TODO: add minimal, compact, and normal views

function FormContent({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formType: number; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        <div className="pt-2 font-bold border-b border-gray-400">
            {formType === 0 ? "Login form" : "Password change form"}
        </div>

        <Part1_FormHeader fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
        <Part2_FormFields fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
    </>);
}

export function Part2_CardBody({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [formsExpanded, setFormsExpanded] = useState(false);

    const allOpenCounter = useAtomValue(allCards.areFoldedCounterAtom);
    useEffect(() => {
        if (allOpenCounter >= 0) {
            const collapse = allOpenCounter % 2 === 0;
            setFormsExpanded(collapse);
        }
    }, [allOpenCounter]);

    const toogleFormsExpanded = () => setFormsExpanded((v) => !v);

    const fileUs = useAtomValue(fileUsAtom);
    const nForms = fileUs.mani?.forms.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;
    const disp = (type: number) => fileUs?.meta?.[type].disp;

    const [selectRowAtoms] = useState<SelectRowAtomsType>({
        loginAtom: atom({ field: -1, form: -1 }),
        cpassAtom: atom({ field: -1, form: -1 }),
    });

    return (<>
        {(hasLogin || hasCpass) &&
            <div className="p-2 bg-gray-200 text-gray-800">

                {/* Buttons */}
                <div className="flex items-center space-x-2 text-sm">
                    {hasLogin && <UICardFormButton disp={disp(0)} opened={formsExpanded} onClick={toogleFormsExpanded} label="Login form" />}
                    {hasCpass && <UICardFormButton disp={disp(1)} opened={formsExpanded} onClick={toogleFormsExpanded} label="Password change form" />}

                    <div className="flex">
                        <IconFormLogin className="w-4 h-4" />
                        <IconFormChange className="w-4 h-4" />
                        {/* <IconBtnFormLogin className="w-4 h-4" />
                        <IconBtnFormChangePsw className="w-4 h-4" /> */}
                    </div>
                </div>

                {/* Forms */}
                {hasLogin && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={0} selectRowAtoms={selectRowAtoms} />)}
                {hasCpass && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={1} selectRowAtoms={selectRowAtoms} />)}
            </div>
        }
    </>);
}
