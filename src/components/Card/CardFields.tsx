import React from 'react';
import ReactDOM from 'react-dom';
import { IconChevronDown, IconChevronUp, IconFieldText, IconInputFieldChk, IconInputFieldChkEmpty, IconInputFieldList, IconInputFieldPsw, IconInputFieldText, IconPreview, IconToggleRight } from '../UI/UiIcons';
import { CardData } from './Card';
import UISimpleBar from '../UI/UIScrollbar';
import { FieldPreview } from './CardFieldPreview';
import { FormOptionPool } from './FormOptionPool';
import { FieldFirstCol, FieldSecondCol } from './UITableFromObject';
import FormOptionDetection from './FormOptionDetection';
import TableField from './FieldRow';

// Form parts utils

// Form detection and options

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

function FormOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
    const detection = form?.detection || {};
    const options = form?.options || {};
    return (
        <div className="">
            <div className="relative my-1 flex space-x-1">
                <FormOptionDetection cardData={cardData} formIndex={formIndex} />
                <FormOptionQuickLink usequicklink={options.usequicklink} />
                <FormOptionLockFields lockfields={options.lockfields} />
                <FormOptionPool names_ext={detection.names_ext} />
            </div>
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

export function FormDetectioAndOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    return (
        <>
            <FormOptions cardData={cardData} formIndex={formIndex} />
        </>
    );
}

export function PartFormFields({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const metaForm = cardData.fileUs.meta?.[formIndex];
    if (!metaForm) {
        return null;
    }
    return (
        <div className="">
            <div className="">fields</div>
            {/* <div className="font-bold border-b border-gray-500"></div> */}
            {metaForm.fields?.map((field, idx) =>
                <React.Fragment key={idx}>
                    {/* <FieldPreview form={metaForm} field={field} /> */}
                    <TableField metaForm={metaForm} field={field} />
                </React.Fragment>
            )}
            {/* <div className="font-bold border-t border-gray-500"></div> */}
        </div>
    );
}

//TODO: policy field
//TODO: rfield (in out), rfieldrindex
//TODO: refs @email
//TODO: script
//TODO: 'path_ext' and ignore 'path' but complain about 'path'

// TODO: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
// TODO: show one preview per form?
// TODO: checkbox (on form preview) to show individual preview per field or not

//TODO: use hover over preview icon instead of click
