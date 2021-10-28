type fileDownloadProps = {
    data: string | ArrayBuffer | ArrayBufferView | Blob;
    filename: string;
    mime?: string;
    parentId?: string;
    bom?: string | Uint8Array;
};

export function fileDownload({ data, filename, mime, parentId, bom }: fileDownloadProps): void {
    const blobData = (typeof bom !== 'undefined') ? [bom, data] : [data];
    const blob = new Blob(blobData, { type: mime || 'application/octet-stream' }); // 'application/octet-stream' for binary data
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobURL;
    a.setAttribute('download', filename);

    // port of https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof a.download === 'undefined') {
        a.setAttribute('target', '_blank');
    }

    const parent = parentId && document.getElementById(parentId) || document.body;
    parent.appendChild(a);
    a.click();

    // Fixes "webkit blob resource error 1"
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobURL);
    }, 200);
}
