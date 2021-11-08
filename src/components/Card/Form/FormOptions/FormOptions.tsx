import React from 'react';
import { useAtom } from 'jotai';
import { detectionEditorAtomAtom, FileUsAtom, SelectRowAtoms } from '../../../../store/store';
import { IconGear } from '../../../UI/UIIconsSymbolsDefs';
import FieldRowPreview from '../FormRows/FieldRowPreview';
import FormOptionsDetection from './FormOptionsDetection';
import FormOptionsPool from './FormOptionsPool';

export const BtnShading: React.CSSProperties = {
    backgroundImage: 'linear-gradient(360deg, #ffffff3f 0%, #9d9d9d2f 30%, #9d9d9d2f 70%, #ffffff3f 100%)',
    boxShadow: '0px 1px #64646420',
};

function FormOptionLockFields({ lockfields }: { lockfields: string | undefined; }) {
    const useit = lockfields == '1';
    const title = `Lock fields: ${useit ? '1 (lock)' : `${lockfields} don\'t lock`}`;
    return (
        <div className={`px-2 h-6 leading-6 border border-gray-500 rounded ${useit ? '' : 'opacity-25'}`} title={title} style={BtnShading}>
            lock
        </div>
    );
}

function FormOptionQuickLink({ ql }: { ql: string | undefined; }) {
    const useit = ql == '1';
    const title = `Quick link: ${useit ? '1 (use)' : ql == '2' ? '2 (don\'t use)' : `'${ql}''`}`;
    return (
        <div className={`px-2 h-6 leading-6 border border-gray-500 rounded text-[.65rem] ${useit ? '' : 'opacity-25'}`} title={title} style={BtnShading}>
            QL
        </div>
    );
}

function FormDetectionEdit({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    const [editorAtom, setEditorAtom] = useAtom(detectionEditorAtomAtom);
    return (
        <div
            className={`px-1 h-6 flex items-center justify-center border border-gray-500 rounded active:scale-[.97]`} title="Edit detection options" style={BtnShading}
            onClick={() => setEditorAtom(editorAtom === fileUsAtom ? undefined : fileUsAtom)}
        >
            <IconGear className="w-4" />
        </div>
    );
}

function OptionsFormPreview({ form, formType, selectRowAtoms, small, setSmall }: { form: Meta.Form; formType: number; selectRowAtoms: SelectRowAtoms; small: boolean; setSmall: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const selectedRowAtom = formType === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom;
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);
    return (
        <div className="" onClick={() => setSmall((v) => !v)}>
            <FieldRowPreview small={small} form={form} selected={selectedRow.field} className={`${small ? 'w-24 max-h-24' : 'w-96 max-h-96'}`}
                onSelected={(selected: number) => setSelectedRow({ field: selected, form: form.type })}
            />
        </div>
    );
}

function FormOptions({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtom; formType: number; selectRowAtoms: SelectRowAtoms; }): JSX.Element | null {
    const [fileUs] = useAtom(fileUsAtom);
    const meta = fileUs.meta?.[formType];
    if (!meta) {
        return null;
    }
    const [small, setSmall] = React.useState(true);
    const form = meta.mani;
    const detection = form?.detection || {};
    const options = form?.options || {};
    const hasFormPreview = !!meta?.view?.rects.length;
    return (
        <div className="relative py-1 flex justify-between text-xs leading-5 bg-gray-300">
            <div className={`place-self-start flex ${small ? 'space-x-1' : 'flex-col items-stretch space-y-1 mr-1'}`}>
                <FormOptionsDetection fileUsAtom={fileUsAtom} formType={formType} />
                <FormOptionsPool names_ext={detection.names_ext} />
                <FormOptionQuickLink ql={options.usequicklink} />
                <FormOptionLockFields lockfields={options.lockfields} />
                <FormDetectionEdit fileUsAtom={fileUsAtom} />
            </div>
            {hasFormPreview && <OptionsFormPreview form={meta} formType={formType} selectRowAtoms={selectRowAtoms} small={small} setSmall={setSmall} />}
        </div>
    );
}

export default FormOptions;

//TODO: form preview: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
//TODO: form preview: show one preview per form?
//TODO: form preview: checkbox (on form preview) to show individual preview per field or not
//TODO: form preview: use hover over preview icon instead of click

//TODO: preview for all fields and highlight on click
//TODO: save split pane position