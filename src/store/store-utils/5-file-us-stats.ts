import { FileContent, FileUs, FileUsStats, ParsedSrc } from "@/store/store-types";
import { TimeUtils } from '@/store/manifest';

export function fileUsStats(fileCnt: FileContent, parsedSrc: ParsedSrc): FileUsStats {
    const loginForm = parsedSrc.mani?.forms[0];
    const loginFormDomain = parsedSrc.meta?.[0]?.disp.domain;
    const isLoginFormWeb = !!loginFormDomain;
    const isSubFolder = !!fileCnt.fpath; // fpath is empty for single items //const hasSubFolders = !!fileCnt.fpath?.match(/\//);
    
    const rv: FileUsStats = {
        domain: loginFormDomain,
        isWeb: isLoginFormWeb,
        isChrome: isLoginFormWeb && !parsedSrc.meta?.[0]?.disp.isIe,
        isFCat: !!parsedSrc.fcat,
        isCustomization: !parsedSrc.meta?.length && !!parsedSrc.mani?.options,
        url: loginForm?.detection.web_ourl,
        title: loginForm?.options.choosename,
        isSubFolder: isSubFolder,
        subFolder: fileCnt.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileCnt.fpath) : fileCnt.fpath || '',
        dateCreated: TimeUtils.dpTimeToShow(parsedSrc.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(parsedSrc.mani?.descriptor?.modified),
    };

    return rv;
}
