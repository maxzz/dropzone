export function fileDownload(
    data: string | ArrayBuffer | ArrayBufferView | Blob,
    filename: string,
    mime?: string,
    bom?: string | Uint8Array
): void {
    var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data];
    var blob = new Blob(blobData, { type: mime || 'application/octet-stream' });
    var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    // port of https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    // Fixes "webkit blob resource error 1"
    setTimeout(function () {
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }, 200);
}