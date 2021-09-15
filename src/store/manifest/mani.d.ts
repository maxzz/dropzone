declare module Mani {
    interface Field {
        displayname?: string,
        type: 'edit' | 'check' | 'button';
        dbname?: string;
        path_ext?: string;
        rfield?: 'in' | 'out';
        rfieldindex?: number;   // "2"
        password?: boolean,     // "1"
        useit?: boolean,        //"1"
    }

    interface FContext {
        type: 'pchange';
        name: number;           // "1"
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
        sidekick?: string;      // "manual mode hint"
        quicklink?: string;
        usequicklink?: number;  // "1" | "2"
        iconlocation?: string;  // "Q:0:0:0"
    }

    interface Form {
        fcontext?: FContext;
        detection: Detection;
        options: Options;
        fields: Field[];
    }

    interface Descriptor {
        id: string;         // "{fe94ea4f-ac76-4f7d-9c74-fa14abca889b}"
        created: string;    // "1d57495 61c6f733"
        modified: string;   // "1d57496 87bed3e8",
        integrity?: string; // "OTS2.056a41167041b1ea2c529494aeb606d0e"
        version: string;    // "2.4.3"
    }

    interface Manifest {
        descriptor: Descriptor;
        forms: Form[];
    }

} //declare module Mani

declare module MPath {      // Manifest unpacked path data

    interface Chunk_p4a {   // from: unpack_fromstring()
        rnumber: number;
        roleString: string;
        className: string;
        name?: string;
    }

    type Chunk_p4 = Chunk_p4a;

    interface Chunk_sid {
        version: string;
        generatedId: string;
        formName: string;
        formAttrs?: string;
        outerHtml?: string;
    }

    interface Chunk_did2 {
        s1: string;
        s2: string;
        s3: string;
        s4?: string;
    }

    interface Chunk_loc {   // In client area or against 1920x1200 or 1600x1200?
        x: number;
        y: number;
        w: number;
        h: number;
        f?: number;         // 0 | 1 if the last element in field (this is internal and not saved).
        i?: number;         // index of rect before dedupe (this is internal and not saved).
    }

    interface Chunk_sn {
        total: number;      // total blocks
        current: number;    // current block
        parts: string[];    // block parts
    }

} //declare module MPath

declare module Meta {       // Manifest unpacked forms, as meta data

    interface Path {        // Collection of path items
        p4a?: MPath.Chunk_p4a[];
        p4?: MPath.Chunk_p4[];
        loc?: string;       // "x y w h | x y w h ... | x y w h"
        sid?: MPath.Chunk_sid;
        did2?: string;
        sn?: MPath.Chunk_sn; // script number
    }

    interface Field {
        mani: Mani.Field,
        path: Path;
    }

    interface Disp {        // Display information about form
        isScript: boolean;  // Form has at least one script field
        isEmpty: boolean;   // Form has no field, i.e. excluded website
    }

    interface Form {
        mani: Mani.Form;
        disp: Disp;
        pool: string[];
        rects: MPath.Chunk_loc[];
        fields: Field[]; // each item corresponds to each field
    }

} //declare module Meta
