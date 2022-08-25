export type { 
    Mani, 
    Meta, 
    Catalog, 
    MPath 
} from './mani';

export type { parseOptions } from './mani-i';

export {
    parseXMLFile,
    Matching
} from './mani-i';

export {
    manifestToJsonForXml
} from './mani-o';

export {
    buildManiMetaForms,
    buildCatalogMeta,
    TimeUtils,
    FieldPath,
    Transform,
    TransformValue
} from './mani-functions';

export {
    convertToXml
} from './xml-to-js';

export type { ValueLife, References } from './mani-refs';
export { ValueAs, valueAsNames, references } from './mani-refs';
