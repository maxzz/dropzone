import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, SelectRowAtomsType } from '@/store';
import { IconCross, IconOptionsLock, IconOptionsQL, IconPreview } from '@ui/UIIconSymbols';
import { FieldRowPreview } from '../../Part3Card_Shared/FieldRowPreview';
import { BtnPopupDetection } from './BtnPopupDetection';
import { BtnPopupPool } from './BtnPopupPool';
import { BtnEdit } from './BtnEdit';

function Icon_LockFields({ lockfields }: { lockfields: string | undefined; }) {
    const useit = lockfields == '1';
    const title = `Lock fields ${useit ? '= 1 (lock)' : `${lockfields} don\'t lock`}`;
    return useit ? IconOptionsLock({className:"w-3 h-3", title}) : null;
}

function Icon_QuickLink({ ql }: { ql: string | undefined; }) {
    const useit = ql == '1';
    const title = `Quick link ${useit ? '= 1 (use)' : ql == '2' ? '= 2 (don\'t use)' : `'${ql}''`}`;
    return useit ? IconOptionsQL({className:"w-2.5 h-2.5", title}) : null;
}

function BtnPreview({ form, formIdx, selectRowAtoms, small, setSmall, }: {
    form: Meta.Form; formIdx: number; selectRowAtoms: SelectRowAtomsType; small: boolean; setSmall: Dispatch<SetStateAction<boolean>>;
}) {
    const [selectedRow, setSelectedRow] = useAtom(formIdx === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom);
    const icon = small
        ? IconPreview({ className: "w-5 h-5 hover:bg-primary-200 rounded active:scale-[.97] opacity-75", title: "Open preview" })
        : IconCross({ className: "p-1.5 w-5 h-5 bg-orange-500/50 text-primary-100" });
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_24px] mr-1 overflow-hidden">
            <div className="w-6 h-6 col-start-2 row-start-1 cursor-pointer flex items-center justify-center z-10" onClick={() => setSmall((v) => !v)}>
                {icon}
            </div>
            {!small &&
                <div className="col-start-1 row-start-1 col-span-2 row-span-2">
                    <FieldRowPreview
                        className={`${small ? 'w-24 max-h-24' : 'w-96 max-h-96'}`}
                        small={small}
                        form={form}
                        selected={selectedRow.field}
                        onSelected={(selected: number) => setSelectedRow({ field: selected, form: form.type })}
                    />
                </div>
            }
        </div>
    );
}

export function Part1Form_Header({ fileUsAtom, formIdx, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formIdx: number; selectRowAtoms: SelectRowAtomsType; }): JSX.Element | null {
    const [small, setSmall] = useState(true);
    const fileUs = useAtomValue(fileUsAtom);
    const meta = fileUs.meta?.[formIdx];
    if (!meta) {
        return null;
    }
    const form = meta.mani;
    const detection = form?.detection || {};
    const options = form?.options || {};
    const hasFormPreview = !!meta?.view?.rects.length;
    return (
        <div className="py-1 text-xs leading-5 flex items-center justify-between bg-primary-300 border-t border-b border-primary-400">

            <div className={`place-self-start flex ${small ? 'space-x-1 items-center' : 'flex-col items-stretch space-y-1 mr-1'}`}>
                <BtnPopupDetection fileUsAtom={fileUsAtom} formType={formIdx} />
                <BtnPopupPool names_ext={detection.names_ext} />
                <BtnEdit fileUsAtom={fileUsAtom} formIdx={formIdx} />

                <div className="flex items-center">
                    <Icon_LockFields lockfields={options.lockfields} />
                    <Icon_QuickLink ql={options.usequicklink} />
                </div>
            </div>

            {hasFormPreview &&
                <BtnPreview
                    form={meta}
                    formIdx={formIdx}
                    selectRowAtoms={selectRowAtoms}
                    small={small}
                    setSmall={setSmall}
                />
            }
        </div>
    );
}

//TODO: form preview: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
//TODO: form preview: show one preview per form?
//TODO: form preview: checkbox (on form preview) to show individual preview per field or not
//TODO: form preview: use hover over preview icon instead of click - won't do

//TODO: preview for all fields and highlight on click - done
//TODO: save split pane position - done

//TODO: check if we have forms in FormDetectionEdit(). (i.e. we have web, win, fields, script, or exclude manifest)
