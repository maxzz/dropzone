import React, { Fragment, useState } from 'react';
import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx, formIdxName, SelectRowAtomsType, UISize, uiSizeAtom } from '@/store';
import { classNames } from '@/utils/classnames';
import { getButtonsDisp } from '../Part4Card_UI/UICardFormButtonTypes';
import { CardNormalButtons } from '../Part3Card_Shared/CardButtons';
import { Part1Form_Header } from './Part1Form_Header/Part1Form_Header';
import { Part2Form_Fields } from './Part2Form_Fields/Part2Form_Fields';

export function Part2Card_FormBody({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const open = useAtomValue(openAtom);
    const fileUs = useAtomValue(fileUsAtom);
    const [selectRowAtoms] = useState<SelectRowAtomsType>({
        loginAtom: atom({ field: -1, form: -1 }),
        cpassAtom: atom({ field: -1, form: -1 }),
    });
    const sizeNormal = useAtomValue(uiSizeAtom) === UISize.normal;

    const buttons = getButtonsDisp(fileUs);
    const hasLogin = buttons[0][0];
    const hasCpass = buttons[1][0];
    const items = [[hasLogin, FormIdx.login], [hasCpass, FormIdx.cpass]] as const;

    return (<>
        {(hasLogin || hasCpass) &&
            <div className={classNames("px-2 bg-primary-200 text-primary-800", open && "pb-2")}>

                {sizeNormal &&
                    <CardNormalButtons buttonsDisp={buttons} openAtom={openAtom} />
                }

                {open && items.map(([hasForm, formIdx]) => hasForm && (
                    <Fragment key={formIdx}>
                        <div className="pt-2 text-sm font-bold">
                            {formIdxName(formIdx)}
                        </div>

                        <Part1Form_Header fileUsAtom={fileUsAtom} formIdx={formIdx} selectRowAtoms={selectRowAtoms} />
                        <Part2Form_Fields fileUsAtom={fileUsAtom} formType={formIdx} selectRowAtoms={selectRowAtoms} />
                    </Fragment>
                ))}
            </div>
        }
    </>);
}
