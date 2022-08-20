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

export const referencesTxt = {
    name: "Windows User Name",
    upnname: "Windows User Principal Name",
    fullname: "Windows Domain\\User Name",
    domain: "Windows Domain",
    "e-mail":"Windows E-mail Address",
}

export const referencesPsw = {
    password: "Windows User Password",
}
