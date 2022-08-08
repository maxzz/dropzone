import React, { useState } from 'react';
import { atom, PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, formEditorDataAtom, SelectRowAtomsType } from '@/store';
import { IconCross, IconGear, IconOptionsLock, IconOptionsQL, IconPreview } from '@ui/UIIconSymbols';
import { FieldRowPreview } from '../Part2Form_Fields/FieldRowPreview';
import { FormOptionsDetection } from './FormOptionsDetection';
import { FormOptionsPool } from './FormOptionsPool';

export const BtnShading: React.CSSProperties = {
    backgroundImage: 'linear-gradient(360deg, #ffffff3f 0%, #9d9d9d2f 30%, #9d9d9d2f 70%, #ffffff3f 100%)',
    boxShadow: '0px 1px #64646420',
};

function Option_LockFields({ lockfields }: { lockfields: string | undefined; }) {
    const useit = lockfields == '1';
    const title = `Lock fields: ${useit ? '1 (lock)' : `${lockfields} don\'t lock`}`;
    return (<>
        {useit && <IconOptionsLock className="w-3 h-3" title={title} />}
    </>);
}

function Option_QuickLink({ ql }: { ql: string | undefined; }) {
    const useit = ql == '1';
    const title = `Quick link: ${useit ? '1 (use)' : ql == '2' ? '2 (don\'t use)' : `'${ql}''`}`;
    return (<>
        {useit && <IconOptionsQL className="w-2.5 h-2.5" title={title} />}
    </>);
}

function FormEditButton({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: number; }) {
    const setFormEditorData = useSetAtom(formEditorDataAtom);
    return (
        <div
            className={`px-1 h-6 flex items-center justify-center border border-gray-500 rounded active:scale-[.97]`}
            onClick={() => setFormEditorData({ fileUsAtom, formIdx: formIdx })}
            title="Edit detection options"
            style={BtnShading}
        >
            <IconGear className="w-4 h-4 stroke-[1.2]" />
        </div>
    );
}

function FormPreview({ form, formIdx, selectRowAtoms, small, setSmall, previewStateAtom }: {
    form: Meta.Form; formIdx: number; selectRowAtoms: SelectRowAtomsType; small: boolean; setSmall: React.Dispatch<React.SetStateAction<boolean>>;
    previewStateAtom: PrimitiveAtom<PreviewAs>;
}) {
    const [previewState, setPreviewState] = useAtom(previewStateAtom);

    const selectedRowAtom = formIdx === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom;
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);

    function onClick() {
        setPreviewState(() => PreviewAs.small);
    }

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_24px] mr-1">
            <div className="w-6 h-6 col-start-2 row-start-1 z-10">
                <div
                    className="h-6 flex items-center"
                    onClick={() => setSmall((v) => !v)}
                >
                    {small
                        ? <IconPreview className="w-5 h-5" />
                        : <IconCross className="p-1 w-5 h-5 bg-orange-500/50" />
                    }
                </div>
            </div>
            {!small &&
                <div className="col-start-1 row-start-1 col-span-2 row-span-2" onClick={() => setSmall((v) => !v)}>
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

// function FormPreview({ form, formIdx, selectRowAtoms, small, setSmall, previewStateAtom }: {
//     form: Meta.Form; formIdx: number; selectRowAtoms: SelectRowAtomsType; small: boolean; setSmall: React.Dispatch<React.SetStateAction<boolean>>;
//     previewStateAtom: PrimitiveAtom<PreviewAs>;
// }) {
//     const [previewState, setPreviewState] = useAtom(previewStateAtom);

//     const selectedRowAtom = formIdx === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom;
//     const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);

//     function onClick() {
//         setPreviewState(() => PreviewAs.small);
//     }

//     return (
//         <div className="relative mr-1">
//             <div className="w-6 h-6">
//                 <div
//                 // className="absolute right-0 top-0 h-6 flex items-center"
//                 className="h-6 flex items-center"
//                     onClick={() => setSmall((v) => !v)}
//                 >
//                     {small
//                         ? <IconPreview className="w-5 h-5" />
//                         : <IconCross className="p-1 w-5 h-5 bg-orange-500/50" />
//                     }
//                 </div>
//             </div>
//             {!small && <div className="" onClick={() => setSmall((v) => !v)}>
//                 <FieldRowPreview
//                     className={`${small ? 'w-24 max-h-24' : 'w-96 max-h-96'}`}
//                     small={small}
//                     form={form}
//                     selected={selectedRow.field}
//                     onSelected={(selected: number) => setSelectedRow({ field: selected, form: form.type })}
//                 />

//             </div>}

//         </div>
//     );
// }

const enum PreviewAs {
    none,
    small,
    full,
}

export function Part1Form_Header({ fileUsAtom, formIdx, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formIdx: number; selectRowAtoms: SelectRowAtomsType; }): JSX.Element | null {
    const previewStateAtom = useState(atom(PreviewAs.none))[0];
    const previewState = useAtomValue(previewStateAtom);
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
        <div className="relative py-1 text-xs leading-5 flex items-center justify-between bg-primary-300 border-t border-b border-primary-400">

            <div className={`place-self-start flex ${small ? 'space-x-1 items-center' : 'flex-col items-stretch space-y-1 mr-1'}`}>
                <FormOptionsDetection fileUsAtom={fileUsAtom} formType={formIdx} />
                <FormOptionsPool names_ext={detection.names_ext} />
                <FormEditButton fileUsAtom={fileUsAtom} formIdx={formIdx} />

                <div className="flex items-center">
                    <Option_LockFields lockfields={options.lockfields} />
                    <Option_QuickLink ql={options.usequicklink} />
                </div>
            </div>

            {hasFormPreview &&
                <FormPreview
                    form={meta}
                    formIdx={formIdx}
                    selectRowAtoms={selectRowAtoms}
                    small={small}
                    setSmall={setSmall}
                    previewStateAtom={previewStateAtom}
                />
            }
        </div>
    );
}

//TODO: form preview: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
//TODO: form preview: show one preview per form?
//TODO: form preview: checkbox (on form preview) to show individual preview per field or not
//TODO: form preview: use hover over preview icon instead of click

//TODO: preview for all fields and highlight on click
//TODO: save split pane position - done

//TODO: check if we have forms in FormDetectionEdit(). (i.e. we have web, win, fields, script, or exclude manifest)
