import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom } from '../../../../store/store';
import { restoreXml } from '../../../../store/manifest/mani-functions';
import { ToggleWithPortal } from './FormOptionsPool';
import UITableFromObject from '../../UICard/UITableFromObject';
import { Matching } from '../../../../store/manifest/mani-i';

function woProtocol(url: string): string {
    return url.replace(/^https?:\/\//, '');
}

function filterDetection(detection: Mani.Detection) {
    let { caption, web_ourl, web_murl, web_qurl, web_checkurl, dlg_class, names_ext, processname, commandline, } = detection;

    let matchOptions;
    if (web_murl) {
        matchOptions = Matching.getMatchInfo(web_murl);
        if (matchOptions) {
            matchOptions.join = matchOptions.join;
            web_murl = matchOptions.url;
        }
    }

    // 1. fix duplicated urls
    let mUrlName = '';
    if (web_ourl === web_murl) {
        web_ourl = undefined;
        mUrlName += '+o';
    }
    if (web_qurl === web_murl) {
        web_qurl = undefined;
        mUrlName += '+q';
    }

    let oUrlName = ''; // case when o and q are the same but m has match options
    let oUrlValue = '';
    if (web_ourl) {
        oUrlName = 'url o';
        if (web_ourl === web_qurl) {
            web_qurl = undefined;
            oUrlName += '+q';
        }
        oUrlValue = web_ourl;
        web_ourl = undefined;
    }

    // 2. fix duplicated processnames
    if (processname === commandline) {
        commandline = undefined;
    }

    processname && (processname = decodeURI(processname));
    commandline && (commandline = restoreXml(decodeURI(commandline)));

    return {
        ...(matchOptions && { 'match as': matchOptions.join }),
        ...(web_murl && { [`url m${mUrlName}`]: woProtocol(web_murl) }),
        ...(oUrlName && { [`${oUrlName}`]: woProtocol(oUrlValue) }),
        ...(web_ourl && { 'url o': woProtocol(web_ourl) }),
        ...(web_qurl && { 'url q': woProtocol(web_qurl) }),
        ...(caption && { caption }),
        ...(dlg_class && { dlg_class }),
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
    //console.log('aa', MatchStyle.regex);

    return (
        <ToggleWithPortal text="detection">
            <div className="mt-1 text-xs bg-gray-100 ring-1 ring-gray-400 shadow-2xl">
                <div className="px-2 py-1 font-bold">summary</div>
                <div className="px-2 w-96 max-w-sm max-h-[40vh] overflow-auto border-t border-b border-gray-400">
                    <UITableFromObject obj={toShowDetection} />
                    <UITableFromObject obj={toShowOptions} />
                </div>
                <div className="my-2">
                    <div className="px-2 font-bold">matching</div>
                    <button className="mx-2 my-2 h-6 px-2 font-bold bg-gray-200 border border-gray-500 rounded scale-[.97] shadow">edit</button>
                </div>
            </div>
        </ToggleWithPortal>
    );
}

export default FormOptionsDetection;
