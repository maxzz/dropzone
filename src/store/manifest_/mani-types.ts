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

// Catalog

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

export type CatalogItem =       // Item in memory w/ meta information
    Catalog.Name
    & {
        index: number;          // index in loaded file.
        uuid: number;           // local (in memory only) unique ID (not updated through one session).
        mru: number;            // most recently used timestamp (as uuid but updated on each use through one session)
        newItem?: boolean;      // just for edit dialog: flag set when new item created so we scroll it into view and reset after scroll done
    };

export type FieldCatalog = {
    items: CatalogItem[];
};

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

/*
C:\Y\c\dp\pm\Components\Include\oti_manifest_valuelife.h:
C:\Y\w\2-web\0-dp\pmat-org-c++\c++\oti_manifest_valuelife.h
    namespace valuelife
    {
        // onetvalue stands for one_time_value; undefined means constant or reference
        //
        typedef enum {undefined, constant=undefined, askreuse, askconfirm, askalways} type_t;
        /*
        if (!onetvalue && !askalways) then "ask reuse"
        if (!onetvalue &&  askalways) then "ask confirm"
        if ( onetvalue &&  askalways) then "ask always"
        if ( onetvalue && !askalways) then "ask always" //this is illigal combination if value is empty, and will be mapped to type_t::askalways because value is empty
        * /
        inline type_t cast(bool isvalueempty_, bool manifest_askalways_, bool manifest_onetvalue_)
        {
            return isvalueempty_ ? (manifest_onetvalue_ ? askalways : (manifest_askalways_ ? askconfirm : askreuse)) : undefined;
        }
        inline void cast(const type_t v_, bool isvalueempty_, bool& manifest_askalways_, bool& manifest_onetvalue_)
        {
            if (isvalueempty_)
                switch (v_)
                {
                  //case illigal   : manifest_askalways_ = false, manifest_onetvalue_ = true;  break;	// if it is one_time_value then we'll askalways
                    case undefined : manifest_askalways_ = false, manifest_onetvalue_ = false; break;	// value is a reference from field catalog
                    case askreuse  : manifest_askalways_ = false, manifest_onetvalue_ = false; break;	// value will be asked and saved, if value is empty
                    case askconfirm: manifest_askalways_ = true,  manifest_onetvalue_ = false; break;	// value is saved but need to be confirmed allways
                    case askalways :
                    default:         manifest_askalways_ = true,  manifest_onetvalue_ = true;  break;	// value is not saved so ask allways
                }
            else
                manifest_askalways_ = false, manifest_onetvalue_ = false; // equals to type_t::askreuse	// value is a reference from fc, reference, or constant.
        }																  // in case of constant or reference manifest_askalways_, manifest_onetvalue_ are ignored,
        // cast without value											  // and value is not saved (we just don't save password, or constants to ps)
        //
        inline type_t cast(bool manifest_askalways_, bool manifest_onetvalue_)							// cast from manifest
        {
            return cast(true, manifest_askalways_, manifest_onetvalue_);
        }
        inline void cast(const type_t v_, bool& manifest_askalways_, bool& manifest_onetvalue_)			// cast to manifest
        {
            return cast(v_, true, manifest_askalways_, manifest_onetvalue_);
        }
    } //namespace valuelife

C:\Y\c\dp\pm\Components\SharedResources\Localization\xresources_referencenames_en-US.rc:
C:\Y\w\2-web\0-dp\pmat-org-c++\c++\xresources_referencenames_en-US.rc:
    STRINGTABLE
    BEGIN
        IDS_DEF_REFNAMES_0		"name=1\nupnname=2\nfullname=3\ndomain=4\ne-mail=5\npassword=6|password=1\next_quest_c@query@nohist=7|both=1\next_quest_cp@query@nohist=8|password=1\next_vip_p@pv@noui=9|password=1\next_vip_potp@id@noui=10|password=1\n"

        IDS_DEF_REFNAMES_1		"1=Windows User Name"
        IDS_DEF_REFNAMES_2		"2=Windows User Principal Name"
        IDS_DEF_REFNAMES_3		"3=Windows Domain\\User Name"
        IDS_DEF_REFNAMES_4		"4=Windows Domain"
        IDS_DEF_REFNAMES_5		"5=Windows E-mail Address"
        IDS_DEF_REFNAMES_6		"6=Windows User Password"
        IDS_DEF_REFNAMES_7		"7=Defender One-time Password"
        IDS_DEF_REFNAMES_8		"8=Defender One-time Password + Windows User Password"
        IDS_DEF_REFNAMES_9		"9=User Password"
        IDS_DEF_REFNAMES_10		"10=User Password + VIP One-time Password"
    END

C:\Y\c\dp\pm\Components\PMAT\DpoTrain\Localization\DpoTrain_en-US.rc:
    IDS_WIZ_FIELD_WRITEONLY "Write Only"

C:\Y\c\dp\pm\Components\PMAT\DpoTrainMgr\include\adminmanagmentwkg_referencenames.h:
    // 3. Use static list of references. Last alternative. 
    if (references.empty())
    {
        references = L"name=Windows User Name\nupnname=Windows User Principal Name\nfullname=Windows Domain\\User Name\ndomain=Windows Domain\ne-mail=Windows E-mail Address\npassword=Windows User Password|password=1\next_quest_c@query@nohist=Defender One-time Password|both=1\next_quest_cp@query@nohist=Defender One-time Password + Windows User Password|password=1\next_vip_p@pv@noui=User Password|password=1\next_vip_potp@id@noui=User Password + VIP One-time Password|password=1\n";
    }

    name=Windows User Name\n
    upnname=Windows User Principal Name\n
    fullname=Windows Domain\\User Name\n
    domain=Windows Domain\n
    e-mail=Windows E-mail Address\n
    password=Windows User Password|password=1\n

    ext_quest_c@query@nohist=Defender One-time Password|both=1\n
    ext_quest_cp@query@nohist=Defender One-time Password + Windows User Password|password=1\n
    ext_vip_p@pv@noui=User Password|password=1\n
    ext_vip_potp@id@noui=User Password + VIP One-time Password|password=1\n
*/

export const enum ValueAs {
    askReuse,
    askConfirm,
    askAlways,
}

export const LIST_valueAskNames = ["Ask - Resuse", "Ask - Confirm", "Ask Always ",];

export type ValueLife = {
    valueAs: ValueAs;           // how to treat value from user
    value?: string;             // key in 'references' if started with '@' otherwise it's a constant value
    isRef?: boolean;            // true if value started with '@' but not '@@'

    fType?: FieldTyp;           // now it has type psw and edit/psw/rest information
  //isPsw?: boolean;            // it comes from field.password, and not from ref @password (ref should reflect field type not opposite).
  //isBtn?: boolean;            // any type but not edit or password
    isNon?: boolean;            // true when value is empty and valueAs is default AskReuse, but input cleared by user
};

export type ReferenceItem = { i: number; f: string; s: string; }; // i - index; f - full name; s - short name.

export type References = {
    txt: Record<string, ReferenceItem>;
    psw: Record<string, ReferenceItem>;
};

export const LIST_references: References = {
    txt: {
        name:     /**/ { i: 0, f: "Windows User Name",           /**/ s: "User Name" },
        upnname:  /**/ { i: 1, f: "Windows User Principal Name", /**/ s: "User Principal Name" },
        fullname: /**/ { i: 2, f: "Windows Domain\\User Name",   /**/ s: "Domain\\User Name" },
        domain:   /**/ { i: 3, f: "Windows Domain",              /**/ s: "Windows Domain" },
        "e-mail": /**/ { i: 4, f: "Windows E-mail Address",      /**/ s: "Windows Email" },
    },
    psw: {
        password: { i: 0, f: "Windows User Password", s: "Windows Password" },
    },
};

/*
    const enum FieldType {       // This is internal type used by Bkg and Cs, but these definitions are close to DPAgent definitions.
        uni = 0,                 // Uninitialized
        txt = 1,                 // Field is unprotected input control.
        psw = 2,                 // Field is password.
        btn = 3,                 // Field is button (possibly to submit).
        chk = 4,                 // Field is checkbox field.
        // The rest is for compatibility to match manifest definitions.
        rad = 5,                 // Field is radiobox
        lst = 6,                 // Field is list as select field.
        cmb = 7,                 // drop down field aka combobox, in many cases it will be a regular edit controll. For manifest::FIELDTYPE::combo
        lab = 8,                 // text for match. The item for corresponding to manifest::FIELDTYPE::text.
        irr = 9,                 // The field type is irrelevant for us, but used (only internally) as a position placeholder in CS form.
    }
*/

/**
 * Our UI internal type
 */
export enum FieldTyp { //type FieldTypeStr = 'edit' | 'button' | 'list' | 'combo' | 'check' | 'radio' | 'text';
    und, // undefined
    edit,
    button,
    list,
    combo,
    check,
    radio,
    text,

    psw, // combined value 'edit' and 'password'
}

export function fieldTyp4Str(field: Mani.Field): FieldTyp { // Convert FieldTyp from string
    let rv = FieldTyp[field.type] || FieldTyp.und;
    return rv === FieldTyp.edit && field.password ? FieldTyp.psw : rv;
}

// Submit

/*
    Form:
    namespace SUBMITTYPE {
        enum type_t {
            undefined = 0,		// For old manifests its undefined
            dosubmit,			// Force submit data, even if submit is not mutched or not detected
            nosubmit,			// Don't submit data. This is statement by User or Admin.
        };

        inline string_t toString(const SUBMITTYPE::type_t& v_) {
            const char* rv;
            switch (v_) {
                case SUBMITTYPE::undefined: rv = "undefined"; break;
                case SUBMITTYPE::dosubmit: rv = "dosubmit"; break;
                case SUBMITTYPE::nosubmit: rv = "nosubmit"; break;
                default: return sformat("NEW %d", (unsigned int)v_);
            }
            return rv;
        }
    }

    Field:
    class field_t {
        bool controltosubmitdata; // This is a former submit. This is mark of control to submit data, not a button mark how it was impropriety used everywhere.
    ...
    }

    bool is_controltosubmitdata() const
    {
        // The control is used to submit data only if both are true. It may be applied not only to button controls.
        // If controltosubmitdata is true it does not mean that it will be used to submit data.
        // Starting from Personal 3.0.0 (Pro 4.3) we are using combination useit and controltosubmitdata.
        // This combination may be applied to any control in theory, but so far we are going to use it for
        // edit and button controls only.
        //
        return controltosubmitdata && useit;
    }

*/

export const enum SUBMIT {
    dosumbit = 'dosumbit',
    nosumbit = 'nosumbit',
}
