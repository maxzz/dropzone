import { FileUs, FileUsStats } from "@/store/store-types";
import { TimeUtils } from '@/store/manifest';

export function fileUsStats(fileUs: FileUs): FileUsStats {
    const loginForm = fileUs.parsedSrc.mani?.forms[0];
    const domain = fileUs.parsedSrc.meta?.[0]?.disp.domain;
    const isWeb = !!domain;
    const isSubFolder = !!fileUs.fpath; // fpath is empty for single items //const hasSubFolders = !!fileUs.fpath?.match(/\//);
    
    const rv: FileUsStats = {
        domain,
        isWeb,
        isChrome: isWeb && !fileUs.parsedSrc.meta?.[0]?.disp.isIe,
        isFCat: !!fileUs.parsedSrc.fcat,
        isCustomization: !fileUs.parsedSrc.meta?.length && !!fileUs.parsedSrc.mani?.options,
        url: loginForm?.detection.web_ourl,
        title: loginForm?.options.choosename,
        isSubFolder: isSubFolder,
        subFolder: fileUs.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileUs.fpath) : fileUs.fpath || '',
        dateCreated: TimeUtils.dpTimeToShow(fileUs.parsedSrc.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(fileUs.parsedSrc.mani?.descriptor?.modified),
    };

    return rv;
}
