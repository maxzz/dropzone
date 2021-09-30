import React from 'react';
import { CardDatum, FormDatum } from '../CardDatum';
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

function FormOptions({formDatum: { cardDatum, formIndex }}: { formDatum: FormDatum }): JSX.Element {
    const form = cardDatum.fileUs.mani?.forms[formIndex];
    const detection = form?.detection || {};
    const options = form?.options || {};
    return (
        <div className="">
            <div className="relative my-1 flex space-x-1">
                <FormOptionDetection cardData={cardDatum} formIndex={formIndex} />
                <FormOptionQuickLink usequicklink={options.usequicklink} />
                <FormOptionLockFields lockfields={options.lockfields} />
                <FormOptionPool names_ext={detection.names_ext} />
            </div>
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

export default FormOptions;

//TODO: policy field
//TODO: rfield (in out), rfieldrindex
//TODO: refs @email
//TODO: script
//TODO: 'path_ext' and ignore 'path' but complain about 'path'

//TODO: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
//TODO: show one preview per form?
//TODO: checkbox (on form preview) to show individual preview per field or not

//TODO: use hover over preview icon instead of click
