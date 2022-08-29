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

export const valueAsNames = ["Ask - Resuse", "Ask - Confirm", "Ask Always ",];

export type ValueLife = {
    valueAs: ValueAs;       // how to treat value from user
    value?: string;         // key in 'references' if started with '@' otherwise it's a constant value
    isRef?: boolean;        // true if value started with '@' but not '@@'

    fType?: FieldTyp;       // now it has type psw and edit/psw/rest information
  //isPsw?: boolean;        // it comes from field.password, and not from ref @password (ref should reflect field type not opposite).
  //isBtn?: boolean;        // any type but not edit or password
    isNon?: boolean;        // true when value is empty and valueAs is default AskReuse, but input cleared by user
};

export type ReferenceItem = { i: number; f: string; s: string; };

export type References = {
    txt: Record<string, ReferenceItem>;
    psw: Record<string, ReferenceItem>;
};

export const references: References = {
    txt: {
        name: { i: 0, f: "Windows User Name", s: "User Name" },
        upnname: { i: 1, f: "Windows User Principal Name", s: "User Principal Name" },
        fullname: { i: 2, f: "Windows Domain\\User Name", s: "Domain\\User Name" },
        domain: { i: 3, f: "Windows Domain", s: "Windows Domain" },
        "e-mail": { i: 4, f: "Windows E-mail Address", s: "Windows Email" },
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

// Submit

/*
    Form:
	namespace SUBMITTYPE {
		enum type_t {
			undefined = 0,				// For old manifests its undefined
			dosubmit,					// Force submit data, even if submit is not mutched or not detected
			nosubmit,					// Don't submit data. This is statement by User or Admin.
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

