import React from 'react';
import { CardData } from './Card';
import { TableFromObject } from './UITableFromObject';
import ButtonWithChildren from './UIButtonWithChildren';

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

function FormOptionDetection({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
    console.log({ form });


    const detection = form?.detection || {};
    const toShowDetection = filterDetection(detection);

    const options = form?.options || {};
    const toShowOptions = filterOptions(options);

    return (
        <ButtonWithChildren name="detection">
            {/* <div className="font-bold border-b border-gray-500"></div> */}
            <TableFromObject obj={toShowDetection} />
            {/* <div className="font-bold border-b border-gray-500"></div> */}
            <TableFromObject obj={toShowOptions} />
        </ButtonWithChildren>
    );
}

export default FormOptionDetection;
