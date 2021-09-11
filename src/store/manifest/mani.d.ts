interface Field {
    displayname?: string,
    type: 'edit' | 'check' | 'button';
    dbname?: string;
    path_ext?: string;
    rfield?: 'in' | 'out';
    rfieldindex?: number; // "2"
    password?: boolean, // "1"
    useit?: boolean, //"1"
}

interface FContext {
    type: 'pchange';
    name: number; // "1"
}

interface Detection {
    caption?: string;
    web_ourl?: string;
    web_murl?: string;
    web_qurl?: string;
    web_checkurl?: boolean; // "1"
    names_ext?: string;
    processname?: string;
    commandline?: string;
}

interface Options {
    choosename?: string;
    sidekick?: string; // "manual mode hint"
    quicklink?: string;
    usequicklink?: number; // "1" | "2"
    iconlocation?: string; // "Q:0:0:0"
}

interface Form {
    fcontext?: FContext;
    detection: Detection;
    options: Options;
    fields: Field[];
}

interface Descriptor {
    id: string; // "{fe94ea4f-ac76-4f7d-9c74-fa14abca889b}"
    created: string; // "1d57495 61c6f733"
    modified: string; // "1d57496 87bed3e8",
    integrity?: string; // "OTS2.056a41167041b1ea2c529494aeb606d0e"
    version: string; // "2.4.3"
}

interface Manifest {
    descriptor: Descriptor;
    forms: Form[];
}

/* Path */

interface PathItem_p4a { // from: unpack_fromstring()
    rnumber: number;
    roleString: string;
    className: string;
    name?: string;
}

type PathItem_p4 = PathItem_p4a;

interface PathItem_sid {
    version: string;
    generatedId: string;
    formName: string;
    formAttrs?: string;
    outerHtml?: string;
}

interface PathItem_did2 {
    s1: string;
    s2: string;
    s3: string;
    s4?: string;
}

interface PathItem_loc { // In client area or against 1920x1200 or 1600x1200?
    x: number;
    y: number;
    w: number;
    h: number;
    f?: number; // 0 | 1 if the last element in field (this is internal and not saved).
    i?: number; // index of rect before dedupe (this is internal and not saved).
}

interface PathItem_sn {
    total: number;      // total blocks
    current: number;    // current block
    parts: string[];    // block parts
}

interface FieldPath {
    p4a?: PathItem_p4a[];
    p4?: PathItem_p4[];
    loc?: string; // "x y w h | x y w h ... | x y w h"
    sid?: PathItem_sid;
    did2?: string;
    sn?: PathItem_sn; // script number
}

/* Path end */

/* Unpacked forms */

interface FormEx {
    pool: string[];
    rects: PathItem_loc[];
    paths: FieldPath[]; // each item corresponds to each field
}

/* Unpacked forms end */
