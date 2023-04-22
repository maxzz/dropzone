import { CatalogItem } from '@/store/manifest/field-catalog';

export * from './atoms-file-catalog';
export * from './mru';

// For debugging

export function mruToString(items: CatalogItem[]) {
    return JSON.stringify(items.map((item) => `${JSON.stringify(item)}\n`), null, 4);
    //console.log('buildMruWItem', `\n${JSON.stringify(item)}\n\n`, mruToString(rv));
}
