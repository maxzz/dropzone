import React from 'react';
import clipboardCopy from 'clipboard-copy';

export function useClipcoardCopy(options: { msOk?: number, msError?: number; } = {}): readonly [{ error: boolean; message: string; }, (text?: string) => Promise<void>] {
    const [copyResult, setCopyResult] = React.useState({ error: false, message: '' });

    async function copy(text?: string) {
        if (text) {
            let showtime = options.msOk || 400;
            try {
                await clipboardCopy(text);
                setCopyResult({ error: false, message: 'Copied' });
            } catch (error) {
                showtime = options.msError || 1000;
                console.error(error);
                setCopyResult({ error: true, message: (error as Error).message });
            }
            setTimeout(() => { setCopyResult({ error: false, message: '' }); }, showtime); // reset. re-entrancy is OK here.
        }
    }

    return [copyResult, copy] as const;
}
