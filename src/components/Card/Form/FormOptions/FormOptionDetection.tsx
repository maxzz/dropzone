import React from 'react';
import { FormDatum } from '../../CardDatum';
import UITableFromObject from '../../UICard/UITableFromObject';
import UIButtonWithChildren from '../../UICard/UIButtonWithChildren';
import { DropDownButton, ToggleWithPortal } from './FormOptionPool';

function filterDetection(detection: Mani.Detection) {
    let { caption, web_ourl, web_murl, web_qurl, web_checkurl, names_ext, processname, commandline, } = detection;

    // 1. fix duplicated urls
    let urlname = '';
    if (web_ourl === web_murl) {
        web_ourl = undefined;
        urlname += '+o';
    }
    if (web_qurl === web_murl) {
        web_qurl = undefined;
        urlname += '+q';
    }

    // 2. fix duplicated processnames
    if (processname === commandline) {
        commandline = undefined;
    }

    processname && (processname = decodeURI(processname));
    commandline && (commandline = decodeURI(commandline));

    return {
        ...(caption && { caption }),
        ...(web_murl && { [`url m${urlname}`]: web_murl }),
        ...(web_ourl && { web_ourl }),
        ...(web_qurl && { web_qurl }),
        ...(processname && { processname }),
        ...(commandline && { commandline }),
        ...(web_checkurl && { checkurl: web_checkurl }),
    };
}

function filterOptions(options: Mani.Options) {
    let { usequicklink, ...rest } = options;
    return {
        ...rest,
    };
}


// function FormOptionDetection({ formDatum }: { formDatum: FormDatum; }) {
//     const form = formDatum.cardDatum.fileUs.mani?.forms[formDatum.formIndex];
//     const toShowDetection = filterDetection(form?.detection || {});
//     const toShowOptions = filterOptions(form?.options || {});
//     return (
//         <UIButtonWithChildren name="detection">
//             <UITableFromObject obj={toShowDetection} />
//             <UITableFromObject obj={toShowOptions} />
//         </UIButtonWithChildren>
//     );
// }

function FormOptionDetection({ formDatum }: { formDatum: FormDatum; }) {
    const form = formDatum.cardDatum.fileUs.mani?.forms[formDatum.formIndex];
    const toShowDetection = filterDetection(form?.detection || {});
    const toShowOptions = filterOptions(form?.options || {});
    return (
        <ToggleWithPortal text="detection">
            <div className="mt-1 bg-gray-100 ring-1 ring-gray-400">
                <div className="px-2 text-xs w-96 max-w-sm max-h-[40vh] overflow-auto shadow-2xl">
                    <UITableFromObject obj={toShowDetection} />
                    <UITableFromObject obj={toShowOptions} />
                </div>
            </div>
        </ToggleWithPortal>
    );
}

export default FormOptionDetection;
