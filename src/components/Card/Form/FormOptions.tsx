import React from 'react';
import { FormDatum } from '../CardDatum';
import FormOptionDetection from './FormOptions/FormOptionDetection';
import FormOptionPool from './FormOptions/FormOptionPool';

function FormOptionLockFields({ lockfields }: { lockfields: string | undefined; }) {
    if (!lockfields) {
        return null;
    }
    return (
        <div className="px-2 border border-gray-500 rounded text-xs">
            fields: {lockfields == '1' ? 'lock' : 'don\'t lock'}
        </div>
    );
}

function FormOptionQuickLink({ usequicklink }: { usequicklink: string | undefined; }) {
    if (!usequicklink) {
        return null;
    }
    return (
        <div className="px-2 border border-gray-500 rounded text-xs">
            quick link{usequicklink == '1' ? '' : usequicklink == '2' ? ': don\'t use' : { usequicklink }}
        </div>
    );
}

function FormOptions({ formDatum }: { formDatum: FormDatum; }): JSX.Element {
    const form = formDatum.cardDatum.fileUs.mani?.forms[formDatum.formIndex];
    const detection = form?.detection || {};
    const options = form?.options || {};
    return (
        <div className="">
            <div className="relative my-1 flex space-x-1">
                <FormOptionDetection formDatum={formDatum} />
                <FormOptionPool names_ext={detection.names_ext} />
                <FormOptionQuickLink usequicklink={options.usequicklink} />
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
