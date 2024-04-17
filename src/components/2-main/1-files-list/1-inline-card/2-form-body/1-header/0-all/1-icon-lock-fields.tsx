import { SymbolOptionsLock } from '@ui/icons';

export function Icon_LockFields({ lockfields }: { lockfields: string | undefined; }) {

    const useit = lockfields == '1';
    if (!useit) {
        return null;
    }

    const title = `Lock fields ${useit
            ? '= 1 (lock)'
            : `${lockfields} don\'t lock`}`;

    return SymbolOptionsLock({ className: "size-3", title });
}
