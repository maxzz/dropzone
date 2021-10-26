// #include "acc_const.h" // 2014, 02.23.14, Libraries, all wo xulrunner.rar
//
#pragma once

#include <oleacc.h>		// for IAccessible constant definitions
#include <atl_strings.h>

namespace acc
{
	#ifndef STATE_SYSTEM_PROTECTED

	#define STATE_SYSTEM_PROTECTED ( 0x20000000 )

	#undef  STATE_SYSTEM_VALID 
	#define STATE_SYSTEM_VALID     ( 0x3fffffff )

	#endif

	/////////////////////////////////////////////////////////////////////////
	// Roles

	// http://msdn2.microsoft.com/en-us/library/ms696152(VS.85).aspx 'Object Roles'
	// http://msdn2.microsoft.com/en-us/library/ms696193(VS.85).aspx 'GetRoleText'
	// http://people.mozilla.com/~chofmann/l10n/tree/mozilla/accessible/public/
	// http://people.mozilla.com/~chofmann/l10n/tree/mozilla/accessible/accessible-docs.html 'Implementing an MSAA Server'

	// http://lxr.mozilla.org/seamonkey/source/accessible/public/nsIAccessibleRole.idl Mozilla IA2 roles
	// http://lxr.mozilla.org/seamonkey/source/accessible/src/msaa/nsRoleMap.h#45 Mozilla IA2 roles map to MSAA roles
	//

	namespace role_mozilla
	{
		const unsigned long ROLE_NOTHING = 0;               // 0x00
		const unsigned long ROLE_TITLEBAR = 1;              // 0x01
		const unsigned long ROLE_MENUBAR = 2;               // 0x02
		const unsigned long ROLE_SCROLLBAR = 3;             // 0x03
		const unsigned long ROLE_GRIP = 4;                  // 0x04
		const unsigned long ROLE_SOUND = 5;                 // 0x05
		const unsigned long ROLE_CURSOR = 6;                // 0x06
		const unsigned long ROLE_CARET = 7;                 // 0x07
		const unsigned long ROLE_ALERT = 8;                 // 0x08
		const unsigned long ROLE_WINDOW = 9;                // 0x09
		const unsigned long ROLE_CLIENT = 10;               // 0x0A
		const unsigned long ROLE_MENUPOPUP = 11;            // 0x0B
		const unsigned long ROLE_MENUITEM = 12;             // 0x0C
		const unsigned long ROLE_TOOLTIP = 13;              // 0x0D
		const unsigned long ROLE_APPLICATION = 14;          // 0x0E
		const unsigned long ROLE_DOCUMENT = 15;             // 0x0F
		const unsigned long ROLE_PANE = 16;                 // 0x10
		const unsigned long ROLE_CHART = 17;                // 0x11
		const unsigned long ROLE_DIALOG = 18;               // 0x12
		const unsigned long ROLE_BORDER = 19;               // 0x13
		const unsigned long ROLE_GROUPING = 20;             // 0x14
		const unsigned long ROLE_SEPARATOR = 21;            // 0x15
		const unsigned long ROLE_TOOLBAR = 22;              // 0x16
		const unsigned long ROLE_STATUSBAR = 23;            // 0x17
		const unsigned long ROLE_TABLE = 24;                // 0x18
		const unsigned long ROLE_COLUMNHEADER = 25;         // 0x19
		const unsigned long ROLE_ROWHEADER = 26;            // 0x1A
		const unsigned long ROLE_COLUMN = 27;               // 0x1B
		const unsigned long ROLE_ROW = 28;                  // 0x1C
		const unsigned long ROLE_CELL = 29;                 // 0x1D
		const unsigned long ROLE_LINK = 30;                 // 0x1E
		const unsigned long ROLE_HELPBALLOON = 31;          // 0x1F

		const unsigned long ROLE_CHARACTER = 32;            // 0x20
		const unsigned long ROLE_LIST = 33;                 // 0x21
		const unsigned long ROLE_LISTITEM = 34;             // 0x22
		const unsigned long ROLE_OUTLINE = 35;              // 0x23
		const unsigned long ROLE_OUTLINEITEM = 36;          // 0x24
		const unsigned long ROLE_PAGETAB = 37;              // 0x25
		const unsigned long ROLE_PROPERTYPAGE = 38;         // 0x26
		const unsigned long ROLE_INDICATOR = 39;            // 0x27
		const unsigned long ROLE_GRAPHIC = 40;              // 0x28
		const unsigned long ROLE_STATICTEXT = 41;           // 0x29 // Microsoft name is ROLE_SYSTEM_TEXT
		const unsigned long ROLE_TEXT_LEAF = 42;            // 0x2A
		const unsigned long ROLE_PUSHBUTTON = 43;           // 0x2B
		const unsigned long ROLE_CHECKBUTTON = 44;          // 0x2C
		const unsigned long ROLE_RADIOBUTTON = 45;          // 0x2D
		const unsigned long ROLE_COMBOBOX = 46;             // 0x2E
		const unsigned long ROLE_DROPLIST = 47;             // 0x2F
		const unsigned long ROLE_PROGRESSBAR = 48;          // 0x30
		const unsigned long ROLE_DIAL = 49;                 // 0x31
		const unsigned long ROLE_HOTKEYFIELD = 50;          // 0x32
		const unsigned long ROLE_SLIDER = 51;               // 0x33
		const unsigned long ROLE_SPINBUTTON = 52;           // 0x34
		const unsigned long ROLE_DIAGRAM = 53;              // 0x35
		const unsigned long ROLE_ANIMATION = 54;            // 0x36
		const unsigned long ROLE_EQUATION = 55;             // 0x37
		const unsigned long ROLE_BUTTONDROPDOWN = 56;       // 0x38
		const unsigned long ROLE_BUTTONMENU = 57;           // 0x39
		const unsigned long ROLE_BUTTONDROPDOWNGRID = 58;   // 0x3A
		const unsigned long ROLE_WHITESPACE = 59;           // 0x3B
		const unsigned long ROLE_PAGETABLIST = 60;          // 0x3C
		const unsigned long ROLE_CLOCK = 61;                // 0x3D
		const unsigned long ROLE_SPLITBUTTON = 62;          // 0x3E
		const unsigned long ROLE_IPADDRESS = 63;            // 0x3F

		// Above are the same as Microsoft, below are new from Mozilla

		const unsigned long ROLE_ACCEL_LABEL = 64;          // 0x40 // This one has double meaning by Microsoft and Mozilla
		const unsigned long ROLE_ARROW  = 65;               // 0x41
		const unsigned long ROLE_CANVAS = 66;               // 0x42
		const unsigned long ROLE_CHECK_MENU_ITEM = 67;      // 0x43
		const unsigned long ROLE_COLOR_CHOOSER  = 68;       // 0x44
		const unsigned long ROLE_DATE_EDITOR = 69;          // 0x45
		const unsigned long ROLE_DESKTOP_ICON = 70;         // 0x46
		const unsigned long ROLE_DESKTOP_FRAME = 71;        // 0x47
		const unsigned long ROLE_DIRECTORY_PANE = 72;       // 0x48
		const unsigned long ROLE_FILE_CHOOSER = 73;         // 0x49
		const unsigned long ROLE_FONT_CHOOSER = 74;         // 0x4A
		const unsigned long ROLE_CHROME_WINDOW = 75;        // 0x4B
		const unsigned long ROLE_GLASS_PANE = 76;           // 0x4C
		const unsigned long ROLE_HTML_CONTAINER = 77;       // 0x4D
		const unsigned long ROLE_ICON = 78;                 // 0x4E
		const unsigned long ROLE_LABEL = 79;                // 0x4F
		const unsigned long ROLE_LAYERED_PANE = 80;         // 0x50
		const unsigned long ROLE_OPTION_PANE = 81;          // 0x51
		const unsigned long ROLE_PASSWORD_TEXT = 82;        // 0x52
		const unsigned long ROLE_POPUP_MENU = 83;           // 0x53
		const unsigned long ROLE_RADIO_MENU_ITEM = 84;      // 0x54
		const unsigned long ROLE_ROOT_PANE = 85;            // 0x55
		const unsigned long ROLE_SCROLL_PANE = 86;          // 0x56
		const unsigned long ROLE_SPLIT_PANE = 87;           // 0x57
		const unsigned long ROLE_TABLE_COLUMN_HEADER = 88;  // 0x58
		const unsigned long ROLE_TABLE_ROW_HEADER = 89;     // 0x59
		const unsigned long ROLE_TEAR_OFF_MENU_ITEM = 90;   // 0x5A
		const unsigned long ROLE_TERMINAL = 91;             // 0x5B
		const unsigned long ROLE_TEXT_CONTAINER = 92;       // 0x5C
		const unsigned long ROLE_TOGGLE_BUTTON = 93;        // 0x5D
		const unsigned long ROLE_TREE_TABLE = 94;           // 0x5E
		const unsigned long ROLE_VIEWPORT = 95;             // 0x5F

		const unsigned long ROLE_HEADER = 96;               // 0x60
		const unsigned long ROLE_FOOTER = 97;               // 0x61
		const unsigned long ROLE_PARAGRAPH = 98;            // 0x62
		const unsigned long ROLE_RULER = 99;                // 0x63
		const unsigned long ROLE_AUTOCOMPLETE = 100;        // 0x64
		const unsigned long ROLE_EDITBAR = 101;             // 0x65
		const unsigned long ROLE_ENTRY = 102;               // 0x66
		const unsigned long ROLE_CAPTION = 103;             // 0x67
		const unsigned long ROLE_DOCUMENT_FRAME = 104;      // 0x68
		const unsigned long ROLE_HEADING = 105;             // 0x69
		const unsigned long ROLE_PAGE = 106;                // 0x6A
		const unsigned long ROLE_SECTION = 107;             // 0x6B
		const unsigned long ROLE_REDUNDANT_OBJECT = 108;    // 0x6C
		const unsigned long ROLE_FORM = 109;                // 0x6D
		const unsigned long ROLE_IME = 110;                 // 0x6E
		const unsigned long ROLE_APP_ROOT = 111;            // 0x6F
		const unsigned long ROLE_PARENT_MENUITEM = 112;     // 0x70
		const unsigned long ROLE_CALENDAR = 113;            // 0x71
		const unsigned long ROLE_COMBOBOX_LIST = 114;       // 0x72
		const unsigned long ROLE_COMBOBOX_LISTITEM = 115;   // 0x73
		const unsigned long ROLE_IMAGE_MAP = 116;           // 0x74
		const unsigned long ROLE_OPTION = 117;              // 0x75
		const unsigned long ROLE_RICH_OPTION = 118;         // 0x76
		const unsigned long ROLE_LISTBOX = 119;             // 0x77

		const unsigned long ROLE_LAST_ENTRY = 120;          // 0x78
	} //namespace role_mozilla

	namespace ROLE
	{
		enum type_t
		{
			none               = 0                             ,    //00
			titlebar           = ROLE_SYSTEM_TITLEBAR          ,    //01
			menubar            = ROLE_SYSTEM_MENUBAR           ,    //02
			scrollbar          = ROLE_SYSTEM_SCROLLBAR         ,    //03
			grip               = ROLE_SYSTEM_GRIP              ,    //04
			sound              = ROLE_SYSTEM_SOUND             ,    //05
			cursor             = ROLE_SYSTEM_CURSOR            ,    //06
			caret              = ROLE_SYSTEM_CARET             ,    //07
			alert              = ROLE_SYSTEM_ALERT             ,    //08
			window             = ROLE_SYSTEM_WINDOW            ,    //09
			client             = ROLE_SYSTEM_CLIENT            ,    //0A
			menupopup          = ROLE_SYSTEM_MENUPOPUP         ,    //0B
			menuitem           = ROLE_SYSTEM_MENUITEM          ,    //0C
			tooltip            = ROLE_SYSTEM_TOOLTIP           ,    //0D
			application        = ROLE_SYSTEM_APPLICATION       ,    //0E
			document           = ROLE_SYSTEM_DOCUMENT          ,    //0F
			pane               = ROLE_SYSTEM_PANE              ,    //10
			chart              = ROLE_SYSTEM_CHART             ,    //11
			dialog             = ROLE_SYSTEM_DIALOG            ,    //12
			border             = ROLE_SYSTEM_BORDER            ,    //13
			grouping           = ROLE_SYSTEM_GROUPING          ,    //14
			separator          = ROLE_SYSTEM_SEPARATOR         ,    //15
			toolbar            = ROLE_SYSTEM_TOOLBAR           ,    //16
			statusbar          = ROLE_SYSTEM_STATUSBAR         ,    //17
			table              = ROLE_SYSTEM_TABLE             ,    //18
			columnheader       = ROLE_SYSTEM_COLUMNHEADER      ,    //19
			rowheader          = ROLE_SYSTEM_ROWHEADER         ,    //1A
			column             = ROLE_SYSTEM_COLUMN            ,    //1B
			row                = ROLE_SYSTEM_ROW               ,    //1C
			cell               = ROLE_SYSTEM_CELL              ,    //1D
			link               = ROLE_SYSTEM_LINK              ,    //1E
			helpballoon        = ROLE_SYSTEM_HELPBALLOON       ,    //1F

			character          = ROLE_SYSTEM_CHARACTER         ,    //20
			listbx             = ROLE_SYSTEM_LIST              ,    //21
			listitem           = ROLE_SYSTEM_LISTITEM          ,    //22
			outline            = ROLE_SYSTEM_OUTLINE           ,    //23
			outlineitem        = ROLE_SYSTEM_OUTLINEITEM       ,    //24
			pagetab            = ROLE_SYSTEM_PAGETAB           ,    //25
			propertypage       = ROLE_SYSTEM_PROPERTYPAGE      ,    //26
			indicator          = ROLE_SYSTEM_INDICATOR         ,    //27
			graphic            = ROLE_SYSTEM_GRAPHIC           ,    //28
			statictext         = ROLE_SYSTEM_STATICTEXT        ,    //29
			text               = ROLE_SYSTEM_TEXT              ,    //2A
			pushbutton         = ROLE_SYSTEM_PUSHBUTTON        ,    //2B
			checkbutton        = ROLE_SYSTEM_CHECKBUTTON       ,    //2C
			radiobutton        = ROLE_SYSTEM_RADIOBUTTON       ,    //2D
			combobox           = ROLE_SYSTEM_COMBOBOX          ,    //2E
			droplist           = ROLE_SYSTEM_DROPLIST          ,    //2F
			progressbar        = ROLE_SYSTEM_PROGRESSBAR       ,    //30
			dial               = ROLE_SYSTEM_DIAL              ,    //31
			hotkeyfield        = ROLE_SYSTEM_HOTKEYFIELD       ,    //32
			slider             = ROLE_SYSTEM_SLIDER            ,    //33
			spinbutton         = ROLE_SYSTEM_SPINBUTTON        ,    //34
			diagram            = ROLE_SYSTEM_DIAGRAM           ,    //35
			animation          = ROLE_SYSTEM_ANIMATION         ,    //36
			equation           = ROLE_SYSTEM_EQUATION          ,    //37
			buttondropdown     = ROLE_SYSTEM_BUTTONDROPDOWN    ,    //38
			buttonmenu         = ROLE_SYSTEM_BUTTONMENU        ,    //39
			buttondropdowngrid = ROLE_SYSTEM_BUTTONDROPDOWNGRID,    //3A
			whitespace         = ROLE_SYSTEM_WHITESPACE        ,    //3B
			pagetablist        = ROLE_SYSTEM_PAGETABLIST       ,    //3C
			clock              = ROLE_SYSTEM_CLOCK             ,    //3D
			splitbutton        = ROLE_SYSTEM_SPLITBUTTON       ,    //3E //ie
			ipaddress          = ROLE_SYSTEM_IPADDRESS         ,    //3F

			outlinebutton      = ROLE_SYSTEM_OUTLINEBUTTON     ,    //40 // This one has double meaning for IE and FF

			dpinfo             = 0x96                          ,    //150 // for dp debugging only
			dpattention        = 0x97                          ,    //151 // for dp debugging only
			html_script        = 0x98                          ,    //152 // for dp debugging only
			html_text          = 0x99                          ,    //153 // for dp debugging only

		};

	} //namespace ROLE

	/////////////////////////////////////////////////////////////////////////
	// State

	namespace STATE
	{
		enum type_t
		{
			none               = 0x00000000L                 ,      //01 // 0x00000000
			unavailable        = STATE_SYSTEM_UNAVAILABLE    ,      //02 // 0x00000001  // Disabled
			selected           = STATE_SYSTEM_SELECTED       ,      //03 // 0x00000002 
			focused            = STATE_SYSTEM_FOCUSED        ,      //04 // 0x00000004 
			pressed            = STATE_SYSTEM_PRESSED        ,      //05 // 0x00000008 
			checked            = STATE_SYSTEM_CHECKED        ,      //06 // 0x00000010 
			mixed              = STATE_SYSTEM_MIXED          ,      //07 // 0x00000020  // 3-state checkbox or toolbar button
			readonly           = STATE_SYSTEM_READONLY       ,      //08 // 0x00000040 
			hottracked         = STATE_SYSTEM_HOTTRACKED     ,      //09 // 0x00000080 
			defaulT            = STATE_SYSTEM_DEFAULT        ,      //0A // 0x00000100 
			expanded           = STATE_SYSTEM_EXPANDED       ,      //0B // 0x00000200 
			collapsed          = STATE_SYSTEM_COLLAPSED      ,      //0C // 0x00000400 
			busy               = STATE_SYSTEM_BUSY           ,      //0D // 0x00000800 
			floating           = STATE_SYSTEM_FLOATING       ,      //0E // 0x00001000  // Children "owned" not "contained" by parent
			marqueed           = STATE_SYSTEM_MARQUEED       ,      //0F // 0x00002000 
			animated           = STATE_SYSTEM_ANIMATED       ,      //10 // 0x00004000 
			invisible          = STATE_SYSTEM_INVISIBLE      ,      //11 // 0x00008000 
			offscreen          = STATE_SYSTEM_OFFSCREEN      ,      //12 // 0x00010000 
			sizeable           = STATE_SYSTEM_SIZEABLE       ,      //13 // 0x00020000 
			moveable           = STATE_SYSTEM_MOVEABLE       ,      //14 // 0x00040000 
			selfvoicing        = STATE_SYSTEM_SELFVOICING    ,      //15 // 0x00080000 
			focusable          = STATE_SYSTEM_FOCUSABLE      ,      //16 // 0x00100000 
			selectable         = STATE_SYSTEM_SELECTABLE     ,      //17 // 0x00200000 
			linked             = STATE_SYSTEM_LINKED         ,      //18 // 0x00400000 
			traversed          = STATE_SYSTEM_TRAVERSED      ,      //19 // 0x00800000 
			multiselectable    = STATE_SYSTEM_MULTISELECTABLE,      //1A // 0x01000000  // Supports multiple selection
			extselectable      = STATE_SYSTEM_EXTSELECTABLE  ,      //1B // 0x02000000  // Supports extended selection
			alert_low          = STATE_SYSTEM_ALERT_LOW      ,      //1C // 0x04000000  // This information is of low priority
			alert_medium       = STATE_SYSTEM_ALERT_MEDIUM   ,      //1D // 0x08000000  // This information is of medium priority
			alert_high         = STATE_SYSTEM_ALERT_HIGH     ,      //1E // 0x10000000  // This information is of high priority
			protecteD          = STATE_SYSTEM_PROTECTED      ,      //1F // 0x20000000
			valid              = STATE_SYSTEM_VALID          ,           // 0x3fffffff  // mask
		};

	} //namespace STATE

} //namespace acc

/////////////////////////////////////////////////////////////////////////////

namespace UIROLE
{
	enum type_t
	{
		unknown,
		text,
		edit,
		psw,
		button,
		check,
		radio,
		listbx,
		combo,
	};

	_cppcast(type_t)
		_cppcase(unknown)
		_cppcase(text)
		_cppcase(edit)
		_cppcase(psw)
		_cppcase(button)
		_cppcase(check)
		_cppcase(radio)
		_cppcase(listbx)
		_cppcase(combo)
	_cppcastend()

} //namespace UIROLE

class rolestate_t
{
public:
	acc::ROLE::type_t role;
	unsigned long state;

	rolestate_t() : role(acc::ROLE::none), state(0)
	{
	} //rolestate_t()

	rolestate_t(unsigned long role_, unsigned long state_) :
		role((acc::ROLE::type_t)role_), state(state_)
	{
	} //rolestate_t()

	void clear()
	{
		role = acc::ROLE::none;
		state = 0;
	} //clear()

	bool empty() const
	{
		bool rv = role == acc::ROLE::none;
		return rv;
	} //empty()

	bool get_is_pane() const {return role == acc::ROLE::pane;}						__declspec(property(get=get_is_pane)) bool is_pane;
	bool get_is_window() const {return role == acc::ROLE::window;}					__declspec(property(get=get_is_window)) bool is_window;
	bool get_is_client() const {return role == acc::ROLE::client;}					__declspec(property(get=get_is_client)) bool is_client;
	bool get_is_grouping() const {return role == acc::ROLE::grouping;}				__declspec(property(get=get_is_grouping)) bool is_grouping;
	bool get_is_password() const {return (state & acc::STATE::protecteD) != 0;}		__declspec(property(get=get_is_password)) bool is_password;
	bool get_is_text() const {return role == acc::ROLE::text && is_readonly;}		__declspec(property(get=get_is_text)) bool is_text;
	bool get_is_statictext() const {return role == acc::ROLE::statictext;}			__declspec(property(get=get_is_statictext)) bool is_statictext;
	bool get_is_edit() const {return role == acc::ROLE::text && !is_readonly;}		__declspec(property(get=get_is_edit)) bool is_edit;
	bool get_is_button() const {return role == acc::ROLE::pushbutton;}				__declspec(property(get=get_is_button)) bool is_button;
	bool get_is_combo() const {return role == acc::ROLE::combobox;}					__declspec(property(get=get_is_combo)) bool is_combo;
	bool get_is_list() const {return role == acc::ROLE::listbx;}					__declspec(property(get=get_is_list)) bool is_list;
	bool get_is_cell() const {return role == acc::ROLE::cell;}						__declspec(property(get=get_is_cell)) bool is_cell;
	bool get_is_table() const {return role == acc::ROLE::table;}					__declspec(property(get=get_is_table)) bool is_table;
	bool get_is_check() const {return role == acc::ROLE::checkbutton;}				__declspec(property(get=get_is_check)) bool is_check;
	bool get_is_radio() const {return role == acc::ROLE::radiobutton;}				__declspec(property(get=get_is_radio)) bool is_radio;
	bool get_is_link() const {return role == acc::ROLE::link;}						__declspec(property(get=get_is_link)) bool is_link;
	bool get_is_invisible() const {return (state & acc::STATE::invisible) != 0;}	__declspec(property(get=get_is_invisible)) bool is_invisible;
	bool get_is_offscreen() const {return (state & acc::STATE::offscreen) != 0;}	__declspec(property(get=get_is_offscreen)) bool is_offscreen;
	bool get_is_visible() const {return !is_invisible;}								__declspec(property(get=get_is_visible)) bool is_visible;
	bool get_is_visiblesomet() const {return !is_invisible || is_offscreen;}		__declspec(property(get=get_is_visiblesomet)) bool is_visiblesomet;
	bool get_is_readonly() const {return (state & acc::STATE::readonly) != 0;}		__declspec(property(get=get_is_readonly)) bool is_readonly;

	bool is_samerole(const rolestate_t& v_, bool roleonly_ = false) const
	{
		bool rv = role == v_.role;
		
		if (roleonly_)
		{
			return rv;
		}

		if (!rv)
		{
			return false;
		}

		if (is_edit || v_.is_edit)
		{
			rv = is_edit == v_.is_edit;
			return rv;
		}

		if (is_text || v_.is_text)
		{
			rv = is_text == v_.is_text;
			return rv;
		}

		return true;
	} //is_samerole()

}; //class rolestate_t

/////////////////////////////////////////////////////////////////////////////

namespace acc
{
	namespace SELECT
	{
		enum type_t
		{
			none            = 0,
			takefocus       = 1,
			takeselection   = 2,
			extendselection = 4,
			addselection    = 8,
			removeselection = 16
		};

	} //namespace SELECT

	class roles_t :
		public std::bitset<128>
	{
		typedef std::bitset<128> t_my;
	public:
		roles_t()
		{
		}

		roles_t(unsigned long l_, unsigned long h_, unsigned long h2_, unsigned long h3_)
		{
			(*this)(l_, h_, h2_, h3_);

		} //roles_t()

		roles_t& operator()(unsigned long l_, unsigned long h_, unsigned long h2_, unsigned long h3_)
		{
			*static_cast<t_my*>(this) =
				(t_my(h3_) << 96) |
				(t_my(h2_) << 64) |
				(t_my(h_)  << 32) |
				 t_my(l_);

			return *this;
		} //operator()

		roles_t& operator=(const string_t& v_)
		{
			unsigned long h3 = 0, h2 = 0, h = 0, l = 0;

			std::istringstream(v_) >> std::hex >>
				l >>
				h >>
				h2 >>
				h3;

			return (*this)(l, h, h2, h3);
		} //operator=()

		operator string_t() const
		{
			t_my mask((unsigned long)(-1));

			std::ostringstream os;

			os << std::hex
				<<  (*this        & mask).to_ulong() << ' '
				<< ((*this >> 32) & mask).to_ulong() << ' '
				<< ((*this >> 64) & mask).to_ulong() << ' '
				<< ((*this >> 96) & mask).to_ulong();

			return os.str();
		} //string_t()

	}; //class roles_t

} //namespace acc
