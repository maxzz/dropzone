import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom } from '../../../../store/store';
import { restoreXml } from '../../../../store/manifest/mani-functions';
import { ToggleWithPortal } from './FormOptionsPool';
import UITableFromObject from '../../UICard/UITableFromObject';

function filterDetection(detection: Mani.Detection) {
    let { caption, web_ourl, web_murl, web_qurl, web_checkurl, dlg_class, names_ext, processname, commandline, } = detection;

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
    commandline && (commandline = restoreXml(decodeURI(commandline)));

    return {
        ...(caption && { caption }),
        ...(dlg_class && { dlg_class }),
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

function FormOptionsDetection({ fileUsAtom, formType }: { fileUsAtom: FileUsAtom; formType: number; }) {
    const [fileUs] = useAtom(fileUsAtom);
    const form = fileUs.mani?.forms[formType];
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

export default FormOptionsDetection;
