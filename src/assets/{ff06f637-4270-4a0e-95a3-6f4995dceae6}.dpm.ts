export default 
`
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
	<descriptor
		id="{fe94ea4f-ac76-4f7d-9c74-fa14abca889b}"
		created="1d57495 61c6f733"
		modified="1d57496 87bed3e8"
		integrity="OTS2.056a41167041b1ea2c529494aeb606d0e"
		version="2.4.3"
	/>
	<forms>
		<form>
			<detection
				caption="Login | ADP Workforce Now®"
				web_ourl="https://workforcenow.adp.com/workforcenow/login.html"
				web_murl="https://workforcenow.adp.com/workforcenow/login.html"
				web_qurl="https://workforcenow.adp.com/workforcenow/login.html"
				web_checkurl="1"
				names_ext="96_:Shell DocObject View:9_100000:a_100000:Internet Explorer_Server:https^2dot;//workforcenow^dot;adp^dot;com/workforcenow/login^dot;html:10_40:Login | ADP Workforce Now®:14_:User ID %0d%0a%0d%0a%0d%0a Administrator Sign In  %0d%0a%0d%0a  %0d%0aRemember My User ID      %0d%0aPassword (case sensitive) %0d%0a %0d%0aSign In %0d%0a %0d%0aForgot your user ID/password?:2a_:User ID:0 0 0 0:0 78 1366 728:0 78 1366 622:509 257 857 462:509 274 857 305:101:form^dot;user_id^dot;user:form:&lt;input name=&quot;user&quot; class=&quot;form-control ng-pristine ng-untouched ng-valid ng-empty&quot; id=&quot;user_id&quot; type=&quot;text&quot; data-dpmaxz-eid=&quot;3&quot; ng-keyup=&quot;enableSubmit()&quot; data-ng-model=&quot;loginForm^dot;id&quot;&gt;:2c_:Remember My User ID:509 313 524 329:form^dot;remember_user_id^dot;remember_user_id:&lt;input name=&quot;remember_user_id&quot; class=&quot;adp-checkbox ng-pristine ng-untouched ng-valid ng-empty&quot; id=&quot;remember_user_id&quot; type=&quot;checkbox&quot; data-dpmaxz-eid=&quot;4&quot; data-ng-model=&quot;loginForm^dot;remember&quot; data-ng-change=&quot;rememberUserIdChange()&quot; data-ng-disabled=&quot;idContainsADP()&quot;&gt;:2a_20000000:Password (case sensitive):509 360 857 391:form^dot;password^dot;password:&lt;input name=&quot;password&quot; class=&quot;form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength&quot; id=&quot;password&quot; type=&quot;password&quot; data-dpmaxz-eid=&quot;5&quot; ng-keyup=&quot;enableSubmit()&quot; data-ng-model=&quot;loginForm^dot;password&quot; data-ng-maxlength=&quot;256&quot;&gt;:2b_1:Sign In:628 403 738 434:form^dot;subBtn^dot;:&lt;button disabled=&quot;&quot; class=&quot;btn btn-primary ng-scope&quot; id=&quot;subBtn&quot; type=&quot;submit&quot; data-ng-click=&quot;saveUserID()&quot; translate=&quot;signin^dot;signin&quot;&gt;Sign In&lt;/button&gt;"
				processname="%25ProgramFiles%25\internet explorer\iexplore.exe"
				commandline="%25ProgramFiles%25\internet explorer\iexplore.exe"
			/>
			<options
				choosename="testadp 123"
				quicklink="testadp 123"
				usequicklink="1"
			/>
			<fields>
				<field
					displayname="User ID"
					type="edit"
					dbname="{a4a7cc50-f3d6-4b98-b604-7297b5a17345}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|0.8..9|0.a..b[loc]c|d|d|d|e|f|10[sid]11.12.13..14"
					useit="1"
				/>
				<field
					displayname="Remember My User ID"
					type="check"
					dbname="{ab66b1af-4640-49e5-b644-a7cb09d16ae1}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|0.8..9|0.15..16[loc]c|d|d|d|e|f|17[sid]11.18.13..19"
				/>
				<field
					displayname="Password (case sensitive)"
					type="edit"
					dbname="{e83d53d4-51e6-462c-af31-4992566982ba}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|0.8..9|1.1a..1b[loc]c|d|d|d|e|f|1c[sid]11.1d.13..1e"
					password="1"
					useit="1"
				/>
				<field
					displayname="Sign In"
					type="button"
					dbname="{e24d561a-949a-433e-8ae3-2a06c0007d88}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|0.8..9|0.1f..20[loc]c|d|d|d|e|f|21[sid]11.22.13..23"
					submit="1"
					useit="1"
				/>
			</fields>
		</form>
		<form>
			<fcontext
				type="pchange"
				name="1"
			/>
			<detection
				caption="ADP"
				web_ourl="https://workforcenow.adp.com/theme/index.html#"
				web_murl="https://workforcenow.adp.com/theme/index.html#"
				web_qurl="https://workforcenow.adp.com/theme/index.html#"
				web_checkurl="1"
				names_ext="96_:Shell DocObject View:9_100000:a_100000:Internet Explorer_Server:https^2dot;//workforcenow^dot;adp^dot;com/theme/index^dot;html#:10_40:ADP:10_:Password:18_:1d_:14_:2a_30000000:Current Password *:0 0 0 0:0 78 1366 728:0 78 1366 1564:253 182 1349 713:258 223 1353 713:264 253 1132 302:264 279 1132 302:264 279 451 302:270 282 445 299:2a_24000000:New Password:264 439 1349 572:264 456 1349 506:264 482 451 506:270 485 445 502:2b_40000000:Example of a strong password:562 491 752 502:2a_20000000:Confirm New Password *:264 506 1349 555:264 531 451 555:270 534 445 551:2b_:Save:1250 589 1345 619:Back:258 87 322 116:101:^dot;shellSlideInBackButton^dot;:&lt;button class=&quot;reactVDL reactButton secondaryButton&quot; id=&quot;shellSlideInBackButton&quot;&gt;%0a        &lt;i class=&quot;fa fa-chevron-left&quot;&gt;&lt;/i&gt;%0a        &lt;span id=&quot;shellSlideInButtonLabel&quot;&gt;Back&lt;/span&gt;%0a      &lt;/button&gt;:NZ:1009 87 1043 121:^dot;userAvatar^dot;:&lt;button class=&quot;wfn-icon-bar--user--avatar&quot; id=&quot;userAvatar&quot; ontouchstart=&quot;&quot;&gt;NZ&lt;/button&gt;:Nataliya Zachesa:1056 97 1167 110:^dot;mastheadGlobalOptions^dot;:&lt;button class=&quot;wfn-icon-bar--user--name&quot; id=&quot;mastheadGlobalOptions&quot;&gt;Nataliya Zachesa &lt;span class=&quot;fa fa-chevron-down&quot; id=&quot;userNameChevronIcon&quot;&gt;&lt;/span&gt;&lt;/button&gt;:Home:173 129 266 163:Resources:266 129 360 163:Myself:360 129 453 163:453 129 487 163:^dot;wfnnav_top_item_button_favorites^dot;:&lt;button class=&quot;wfnnav-top-item--button&quot; id=&quot;wfnnav_top_item_button_favorites&quot; data-rid=&quot;favorites&quot;&gt;&lt;i class=&quot;fa fa-star&quot;&gt;&lt;/i&gt;&lt;/button&gt;:980 129 1007 163:^dot;magnifyingGlass^dot;:&lt;button id=&quot;magnifyingGlass&quot;&gt;&lt;i class=&quot;fa fa-search&quot;&gt;&lt;/i&gt;&lt;/button&gt;:2a_:Search Workforce Now:1007 129 1193 163:^dot;searchBox^dot;:&lt;input id=&quot;searchBox&quot; type=&quot;text&quot; placeholder=&quot;Search Workforce Now&quot;&gt;"
				processname="%25ProgramFiles%25\internet explorer\iexplore.exe"
				commandline="%25ProgramFiles%25\internet explorer\iexplore.exe"
			/>
			<options
				usequicklink="2"
			/>
			<fields>
				<field
					displayname="current pwd"
					type="edit"
					dbname="{e83d53d4-51e6-462c-af31-4992566982ba}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|1.8.4.|0.8.4.9|0.a..|1.b..|0.c..|0.d..e[loc]f|10|10|10|11|12|13|14|15|16|17"
					rfield="in"
					rfieldindex="2"
					password="1"
					useit="1"
				/>
				<field
					displayname="new pwd"
					type="edit"
					dbname="{e83d53d4-51e6-462c-af31-4992566982ba}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|1.8.4.|0.8.4.9|1.a..|2.b..|0.c..|0.18..19[loc]f|10|10|10|11|12|13|1a|1b|1c|1d"
					rfield="out"
					rfieldindex="2"
					password="1"
					useit="1"
				/>
				<field
					displayname="button"
					type="button"
					dbname="{f9dca4fc-a8ae-49a1-87eb-75967421b1b0}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|1.8.4.|0.8.4.9|1.a..|2.b..|1.1e..1f[loc]f|10|10|10|11|12|13|1a|1b|20"
					submit="1"
				/>
				<field
					displayname="confirm new pwd"
					type="edit"
					dbname="{e83d53d4-51e6-462c-af31-4992566982ba}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|1.8.4.|0.8.4.9|1.a..|3.b..|0.c..|0.21..22[loc]f|10|10|10|11|12|13|1a|23|24|25"
					rfield="out"
					rfieldindex="2"
					password="1"
					useit="1"
				/>
				<field
					displayname="Save"
					type="button"
					dbname="{11b88a41-6eff-4fe1-9a08-761e7afbc0ed}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|1.8.4.|0.8.4.9|0.26..27[loc]f|10|10|10|11|12|13|28"
					submit="1"
				/>
				<field
					displayname="Back"
					type="button"
					dbname="{5b48f9c6-5a5b-4455-b5e5-457b045a41d4}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|75.26..29[loc]f|10|10|10|11|2a[sid]2b.2c...2d"
					submit="1"
				/>
				<field
					displayname="NZ"
					type="button"
					dbname="{071049f4-6f1f-45e6-9849-ce522d1fd755}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|5.26..2e[loc]f|10|10|10|11|2f[sid]2b.30...31"
					submit="1"
				/>
				<field
					displayname="Nataliya Zachesa"
					type="button"
					dbname="{54a7f7fa-3b5e-4f7a-8295-c124f4e43da3}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|6.26..32[loc]f|10|10|10|11|33[sid]2b.34...35"
					submit="1"
				/>
				<field
					displayname="Home"
					type="button"
					dbname="{ba43262a-0c9a-4677-b11b-bc7e7ca3f2ca}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|a.26..36[loc]f|10|10|10|11|37"
					submit="1"
				/>
				<field
					displayname="Resources"
					type="button"
					dbname="{9f5f5f6f-9d88-46aa-89c0-564ffb07a288}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|b.26..38[loc]f|10|10|10|11|39"
					submit="1"
				/>
				<field
					displayname="Myself"
					type="button"
					dbname="{ea70cb32-8b3f-4004-932b-9bc7202cd7f4}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|15.26..3a[loc]f|10|10|10|11|3b"
					submit="1"
				/>
				<field
					displayname="button"
					type="button"
					dbname="{d78581a4-3be7-4e77-8c3d-f18f5e52b2bb}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|72.26..[loc]f|10|10|10|11|3c[sid]2b.3d...3e"
					submit="1"
				/>
				<field
					displayname="button"
					type="button"
					dbname="{fbab1f4f-376f-4def-b803-9e0b7269247d}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|73.26..[loc]f|10|10|10|11|3f[sid]2b.40...41"
					submit="1"
				/>
				<field
					type="edit"
					dbname="{de30fcfc-b64e-4a10-8d75-5bd1bc725a32}"
					path_ext="[p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|0.42..43[loc]f|10|10|10|11|44[sid]2b.45...46"
				/>
			</fields>
		</form>
	</forms>
</manifest>
`