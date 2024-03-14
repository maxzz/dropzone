function fileExt(filename: string = ''): string {
    return /[.]/.exec(filename) ? /([^.]+$)/.exec(filename)?.[0] || '' : '';
}

export function nameLengthValidator(file: File): { code: string; message: string; } | null {
    const maxSize = 100000;

    const ext = fileExt(file.name).toLowerCase();
    if (ext !== 'dpm' && ext !== 'dpn') {
        return {
            code: "unknown-type",
            message: `The file extension must be .dpm or .dpn`,
        };
    }

    if (file.size > maxSize) {
        return {
            code: "size-too-big",
            message: `The file size (${file.size}) exceeds the allowed ${maxSize} bytes.`,
        };
    }

    return null;
}
