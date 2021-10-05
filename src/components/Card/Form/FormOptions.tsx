import { PrimitiveAtom, useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import React from 'react';
import { FormDatum } from '../CardDatum';
import FieldRowPreview from './FieldRow/FieldRowPreview';
import FormOptionDetection from './FormOptions/FormOptionDetection';
import FormOptionPool from './FormOptions/FormOptionPool';

function FormOptionLockFields({ lockfields }: { lockfields: string | undefined; }) {
    const useit = lockfields == '1';
    const title = `Lock fields: ${useit ? '1 (lock)' : `${lockfields} don\'t lock`}`;
    return (
        <div className={`px-2 h-6 leading-6 border border-gray-500 rounded ${useit ? '' : 'opacity-25'}`} title={title}>
            lock
        </div>
    );
}

function FormOptionQuickLink({ ql }: { ql: string | undefined; }) {
    const useit = ql == '1';
    const title = `Quick link: ${useit ? '1 (use)' : ql == '2' ? '2 (don\'t use)' : `'${ql}''`}`;
    return (
        <div className={`px-1 h-6 leading-6 border border-gray-500 rounded text-[.65rem] ${useit ? '' : 'opacity-25'}`} title={title}>
            QL
        </div>
    );
}

function FormOptions({ formDatum, selectedRowAtom }: { formDatum: FormDatum; selectedRowAtom: PrimitiveAtom<number>; }): JSX.Element | null {
    const meta = formDatum.cardDatum.fileUs.meta?.[formDatum.formIndex];
    if (!meta) {
        return null;
    }
    const form = meta.mani;
    const detection = form?.detection || {};
    const options = form?.options || {};
    const [small, setSmall] = React.useState(true);
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);
    return (
        <div className="relative py-1 flex justify-between text-xs leading-5 bg-gray-300">
            <div className={`place-self-start flex ${small ? 'space-x-1' : 'flex-col items-stretch space-y-1 mr-1'}`}>
                <FormOptionDetection formDatum={formDatum} />
                <FormOptionPool names_ext={detection.names_ext} />
                <FormOptionQuickLink ql={options.usequicklink} />
                <FormOptionLockFields lockfields={options.lockfields} />
            </div>
            <div className="" onClick={() => setSmall((v) => !v)}>
                <FieldRowPreview form={meta} selected={selectedRow} small={small} className={`${small ? 'w-24 max-h-24' : 'w-96 max-h-96'}`} 
                    onSelected={(selected: number) => setSelectedRow(selected)} 
                />
            </div>
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