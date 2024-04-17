import { SymbolOptionsQL } from '@ui/icons';

export function Icon_QuickLink({ ql }: { ql: string | undefined; }) {

    const useit = ql == '1';
    if (!useit) {
        return null;
    }

    const title = `Quick link ${useit
        ? '= 1 (use)'
        : ql == '2'
            ? '= 2 (don\'t use)'
            : `'${ql}''`}`;

    return SymbolOptionsQL({ className: "w-3.5 h-3.5", title });
}
