export default function cx(...configs: any[]) {
    return configs.map(config => typeof config === 'string' ? config : Object.keys(config).filter(k => config[k]).join(' '), ).join(' ');
}
