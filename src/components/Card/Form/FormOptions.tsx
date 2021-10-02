import React from 'react';
import { FormDatum } from '../CardDatum';
import FormOptionDetection from './FormOptions/FormOptionDetection';
import FormOptionPool from './FormOptions/FormOptionPool';

function FormOptionLockFields({ lockfields }: { lockfields: string | undefined; }) {
    const useit = lockfields == '1';
    const title = `Lock fields: ${useit ? '1 (lock)' : `${lockfields} don\'t lock`}`;
    return (
        <div className={`px-2 border border-gray-500 rounded ${useit ? '' : 'opacity-25'}`} title={title}>
            lock
        </div>
    );
}

function FormOptionQuickLink({ ql }: { ql: string | undefined; }) {
    const useit = ql == '1';
    const title = `Quick link: ${useit ? '1 (use)' : ql == '2' ? '2 (don\'t use)' : `'${ql}''`}`;
    return (
        <div className={`px-1 border border-gray-500 rounded ${useit ? '' : 'opacity-25'}`} title={title}>
            QL
        </div>
    );
}

function FormOptions({ formDatum }: { formDatum: FormDatum; }): JSX.Element {
    const form = formDatum.cardDatum.fileUs.mani?.forms[formDatum.formIndex];
    const detection = form?.detection || {};
    const options = form?.options || {};
    return (
        <div className="">
            <div className="relative my-1 flex space-x-1 text-xs leading-5">
                <FormOptionDetection formDatum={formDatum} />
                <FormOptionPool names_ext={detection.names_ext} />
                <FormOptionQuickLink ql={options.usequicklink} />
                <FormOptionLockFields lockfields={options.lockfields} />
            </div>
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

export default FormOptions;

//TODO: form preview: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
//TODO: form preview: show one preview per form?
//TODO: form preview: checkbox (on form preview) to show individual preview per field or not
//TODO: form preview: use hover over preview icon instead of click
