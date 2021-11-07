export default function cx(...configs: any[]): string {
    return configs.map(config => typeof config === 'string'
        ? config
        : Object.keys(config).filter(k => config[k]).join(' '),
    ).join(' ');
}

export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}
