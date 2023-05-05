import { FieldTyp, ValueLife } from "./mani-types";

/**
 * Object.entries() type support
 */
export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

export module Mani {
    export type FieldTypeStr = 'edit' | 'button' | 'list' | 'combo' | 'check' | 'radio' | 'text';

    export interface Field {
        displayname?: string,
        type: FieldTypeStr;
        dbname?: string;
        path_ext?: string;
        policy?: string;        // this is standard rule: "[p4]g:8:8:withspecial:different_ap"
        policy2?: string;       // this is custom rule like: "[e1]g:(a{4,4}d{2,2}A{1,1}[@#$%!]{1,1})&lt;8,8&gt;"; both can present at the same time

        value?: string;
        choosevalue?: string;

        askalways?: boolean,    // "1"
        onetvalue?: boolean,    // "1"

        password?: boolean,     // "1"
        submit?: boolean,       // "1"
        useit?: boolean,        // "1"

        rfield?: 'in' | 'out';
        rfieldindex?: number;   // "2"
        rfieldform?: string;    // refs from login form

        controltosubmitdata?: boolean;
        ids?: string;
        options?: string;
    }

    export enum FORMNAME {      // predefined form names
        noname = -1,
        signon = 0,
        pchange = 1,
        fieldcatalog = -2,
    }

    export interface FContext {
        type: 'pchange';
        name: number;           // "1"
    }

    export interface Detection {
        caption?: string;
        web_ourl?: string;
        web_murl?: string;
        web_qurl?: string;
        web_checkurl?: boolean; // "1"
        dlg_class?: string;
        names_ext?: string;
        processname?: string;
        commandline?: string;
    }

    export interface Options {
        choosename?: string;
        sidekick?: string;      // "manual mode hint"
        ownernote?: string;
        quicklink?: string;     // QL menu name
        auth_pl?: string;       // policy
        balooncount?: string;
        autoprompt?: string;    // boolean
        lockfields?: string;    // "0" | "1"
        submittype?: string;    // "dosubmit" | "nosubmit"
        iconkey?: string;       // Any name not necessarily unique
        iconlocation?: string;  // Format is the same as described into feedback_drawing.h. "Q:0:0:0"
        usequicklink?: string;  // ("1" | "usequicklink") | ("2" | "dontusequicklink")
        recheckwindowafterfillin?: string; // boolean
        qlwocred?: string;      // boolean. Quick reauthentication enable/disable
    }

    export interface Form {
        fcontext?: FContext;
        detection: Detection;
        options: Options;
        fields: Field[];
    }

    export interface Descriptor {
        id: string;             // "{fe94ea4f-ac76-4f7d-9c74-fa14abca889b}"
        created: string;        // "1d57495 61c6f733"
        modified: string;       // "1d57496 87bed3e8",
        integrity?: string;     // "OTS2.056a41167041b1ea2c529494aeb606d0e"
        version: string;        // "2.4.3"
    }

    export namespace Customization {
        export interface Process {
            name: string;       // process name like 'outlook.exe'
            type: string;       // 'skip'
        }
        export interface Options {
            processes: Process[];
        }
    }

    export interface Manifest {
        descriptor: Descriptor;
        options?: Customization.Options;
        forms: Form[];
    }

} //module Mani

export module Catalog {         // pmat/include/ots_storagecatalog_io.h
    export interface Descriptor {
        id?: string;            // default as guid
    }

    export interface Name {
        dispname: string;
        dbname: string;
        value?: string;
        ownernote?: string;
        askalways?: boolean;    // undefined : '1' 
        onetvalue?: boolean;    // undefined : '1'
        password?: boolean;     // undefined : '1'
    }

    export interface Root {
        descriptor?: Descriptor;
        names: Name[];
    }
}

export module MPath {           // Meta path. Manifest unpacked path data

    export interface p4a {      // Chunk: p4a (from: unpack_fromstring())
        rnumber: number;
        roleString: string;
        className: string;
        name?: string;
    }

    export type p4 = p4a;       // Chunk: p4

    export interface sid {      // Chunk: sid
        version: string;
        generatedId: string;
        formName: string;
        formAttrs?: string;
        outerHtml?: string;
    }

    export interface did2 {     // Chunk: did2
        s1: string;
        s2: string;
        s3: string;
        s4?: string;
    }

    export interface loc {      // Chunk: loc (size is in client area or against 1920x1200 or 1600x1200?)
        x: number;
        y: number;
        w: number;
        h: number;
        f?: number;             // 0 | 1 if the last element in field (this is internal and not saved).
        i?: number;             // index of rect before dedupe (this is internal and not saved).
    }

    export interface sn {       // Chunk: sn
        total: number;          // total blocks
        current: number;        // current block
        parts: string[];        // block parts
    }

} //module MPath

export module Meta {            // Manifest unpacked forms, as meta data

    export interface Path {     // Collection of path items (chunks)
        p4a?: MPath.p4a[];
        p4?: MPath.p4[];
        loc?: string;           // "x y w h | x y w h ... | x y w h"
        sid?: MPath.sid;
        did2?: string;
        sn?: MPath.sn;          // script number
    }

    export type Chunk = keyof Meta.Path; //type ChunkName = 'p4a' | 'p4' | 'loc' | 'sid' | 'did2' | 'sn';

    export interface Field {
        mani: Mani.Field,
        ftyp: FieldTyp,
        life: ValueLife;
        path: Path;
        pidx: number;           // index in the form
        ridx: number;           // for preview index in form.view.rects (or -1 if no found, but it should never happens if view exist)
    }

    export interface Disp {     // Display information about form
        domain?: string;        // Form website domain if website.
        isScript: boolean;      // Form has at least one script field.
        noFields: boolean;      // Form has no fields, i.e. excluded website.
        isIe: boolean;          // Form detection processname contains 'iexplore.exe' i.e. login was trained with IE as (manual or normal and this depends on isScript).
        bailOut?: string[];     // Manifest needs extra attention
    }

    export interface Bounds {
        x1: number;             // x1,y1 ┌──────┐
        y1: number;             //       │      │
        x2: number;             //       └──────┘ x2,y2
        y2: number;
    }

    export interface View {
        rects: MPath.loc[];
        bounds: Bounds;
    }

    export interface Form {
        mani: Mani.Form;
        type: number;           // 0 - login; 1 - password change
        disp: Disp;
        pool: string[];
        view?: View;            // view exists only for IE and win32
        fields: Field[];        // each item corresponds to each field
        rother: number[];       // array of ridx from another form, i.e for form.type 0 its rects indices of form.type 1, and vice versa
    }

} //module Meta
