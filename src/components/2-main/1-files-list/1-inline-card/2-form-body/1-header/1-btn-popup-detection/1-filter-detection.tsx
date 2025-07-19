import { Mani, Matching, TransformEncoding } from "@/store/manifest";

type FilterDetectionResult = {
    checkurl?: true | undefined;
    commandline?: string | undefined;
    processname?: string | undefined;
    dlg_class?: string | undefined;
    caption?: string | undefined;
    'url q'?: string | undefined;
    'url o'?: string | undefined;
    'match as'?: string | undefined;
};

export function filterDetection(detection: Mani.Detection): FilterDetectionResult {
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

    processname && (processname = TransformEncoding.persentRemove(processname));
    commandline && (commandline = TransformEncoding.xmlRestore(TransformEncoding.persentRemove(commandline)));

    return {
        ...(matchOptions && { 'match as': matchOptions.join }),
        ...(web_murl && { [`url m${mUrlName}`]: removeUrlProtocol(web_murl) }),
        ...(oUrlName && { [`${oUrlName}`]: removeUrlProtocol(oUrlValue) }),
        ...(web_ourl && { 'url o': removeUrlProtocol(web_ourl) }),
        ...(web_qurl && { 'url q': removeUrlProtocol(web_qurl) }),
        ...(caption && { caption }),
        ...(dlg_class && { dlg_class }),
        ...(processname && { processname }),
        ...(commandline && { commandline }),
        ...(web_checkurl && { checkurl: web_checkurl }),
    };
}

function removeUrlProtocol(url: string): string {
    return url.replace(/^https?:\/\//, '');
}
