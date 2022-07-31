import React, { HTMLAttributes, SVGProps, useEffect, useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { allCards, FileUsAtomType, SelectRowAtomsType } from '@/store';
import { UICardFormButton } from '../Part4_CardUI/UICardFormButton';
import { Part1_FormHeader } from './Part1_FormHeader/Part1_FormHeader';
import { Part2_FormFields } from './Part2_FormFields/Part2_FormFields';

const SvgComponentLogin = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <style>
                {
                    ".cls-2{fill:none;stroke:#000;stroke-miterlimit:2;stroke-width:1.44px}"
                }
            </style>
        </defs>
        <path
            className="cls-2"
            d="m17.93 8.75-4.49 4.49 2.1 2.07a.99.99 0 0 1-.68 1.69s-1.79.2-4.05.2-3.45-.08-3.45-.08a1 1 0 0 1-1.01-.99s-.11-1.96-.11-3.78.11-3.75.11-3.75a.98.98 0 0 1 1.68-.7l2.4 2.37 4.51-4.51a1.03 1.03 0 0 1 1.47 0l1.51 1.51c.41.41.41 1.07 0 1.48Z"
        />
        <path
            className="cls-2"
            d="M19.35 21.66s-3.87.18-7.3.18-7.3-.18-7.3-.18a2.25 2.25 0 0 1-2.25-2.25s-.35-2.65-.35-7.41c0-4.4.16-5.64.35-7.41.13-1.24 1.01-2.25 2.25-2.25 0 0 3.9-.18 7.3-.18s7.3.18 7.3.18a2.25 2.25 0 0 1 2.25 2.25s.24 3.69.24 7.41-.24 7.41-.24 7.41a2.25 2.25 0 0 1-2.25 2.25Z"
        />
    </svg>
);

//TODO: add minimal, compact, and normal views

const SvgComponentChange = (props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) => (
    <svg
        id="ideas"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        {...props}
    >
        <defs>
            <style>
                {
                    ".cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:1.39px}"
                }
            </style>
        </defs>
        <path
            className="cls-1"
            d="m21.5 10-3 2.8c-.4.5-1.1.5-1.6 0L14 10c-.4-.5.1-1.4.8-1.4H16V7.4c0-1.4-1-2.5-2.4-2.5H10C8.6 5 7.5 6 7.5 7.4c0 .4-.4.7-.8.7H5.6c-.6 0-1.1-.4-1.1-1v-.7c0-2.3 1.9-4.2 4.2-4.2h6.6c2.3 0 4.2 1.9 4.2 4.2v2.2h1.2c.7 0 1.3.9.8 1.4ZM2.5 14l3-2.8c.4-.5 1.1-.5 1.6 0l3 2.8c.4.5-.1 1.4-.8 1.4H8v1.2c0 1.4 1 2.5 2.4 2.5H14c1.3 0 2.4-1.1 2.4-2.5 0-.4.4-.8.8-.8h1.1c.6 0 1.1.5 1.1 1.2v.6c0 2.3-1.9 4.2-4.2 4.2H8.7c-2.3 0-4.2-1.9-4.2-4.2v-2.2H3.3c-.7 0-1.3-.9-.8-1.4Z"
        />
    </svg>
);

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
                        <SvgComponentLogin className="w-4 h-4" />
                        <SvgComponentChange className="w-4 h-4" />
                    </div>
                </div>

                {/* Forms */}
                {hasLogin && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={0} selectRowAtoms={selectRowAtoms} />)}
                {hasCpass && formsExpanded && (<FormContent fileUsAtom={fileUsAtom} formType={1} selectRowAtoms={selectRowAtoms} />)}
            </div>
        }
    </>);
}
