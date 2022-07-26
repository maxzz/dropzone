export function cx(...classes: Array<string | Record<string, boolean>>): string {
    return classes.map((cls) => (
        typeof cls === 'string'
            ? cls
            : Object.keys(cls).filter((subKey: string) => cls[subKey]).join(' ')),
    ).join(' ');
}

export function classNames(...classes: (string | undefined | false | null)[]): string {
    return classes.filter(Boolean).join(' ');
}
