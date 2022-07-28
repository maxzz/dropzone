export function withDigits(value: number, digits: number = 2): string {
    return value.toFixed(Math.max(Math.min(digits, 20), 0));
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function plural(n: number): string {
    return n === 1 ? '' : 's';
}
