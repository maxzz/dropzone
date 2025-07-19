import { SvgSymbolPreview } from "./01-preview";
import { SvgSymbolInOut } from "./02-in-out";
import { SvgSymbolOptionsLock } from "./03-options-lock";
//import { SvgSymbolOptionsQl_firstVersion } from "./all04-options-ql-1st";
import { SvgSymbolOptionsQl } from "./05-options-ql";
import { SvgSymbolFolder } from "./06-folder";
import { SvgSymbolAttention } from "./07-attention";
import { SvgSymbolDot } from "./08-dot";
import { SvgSymbolOpenLink } from "./09-open-link";
import { SvgSymbolGear } from "./10-gear";
//import { SvgSymbolGear_8leafs } from "./all11-gear-8leafs";
import { SvgSymbolMenuBurger } from "./12-menu-burger";
import { SvgSymbolCross } from "./13-cross";
import { SvgSymbolPen } from "./14-pen";
import { SvgSymbolFormLogin } from "./15-form-login";
import { SvgSymbolFormChange } from "./16-form-change";
import { SvgSymbolClassicCheck } from "./17-checkbox-classic";
import { SvgSymbolClassicCheckEmpty } from "./18-checkbox-classic-empty";
import { SvgSymbolChevronDown } from "./20-chevron-down";
import { SvgSymbolChevronUp } from "./21-chevron-up";
import { SvgSymbolChevronDoubleDown } from "./22-chevron-double-down";
import { SvgSymbolChevronRight } from "./23-chevron-right";

export * from "./01-preview";
export * from "./02-in-out";
export * from "./03-options-lock";
//export * from "./other04-options-ql-1st";
export * from "./05-options-ql";
export * from "./06-folder";
export * from "./07-attention";
export * from "./08-dot";
export * from "./09-open-link";
export * from "./10-gear";
//export * from "./other11-gear-8leafs";
export * from "./12-menu-burger";
export * from "./13-cross";
export * from "./14-pen";
export * from "./15-form-login";
export * from "./16-form-change";
export * from "./17-checkbox-classic";
export * from "./18-checkbox-classic-empty";
export * from "./20-chevron-down";
export * from "./21-chevron-up";
export * from "./22-chevron-double-down";
export * from "./23-chevron-right";

export function DefAllOther() {
    return (<>
        {/* field row state */}

        {SvgSymbolPreview()}
        {SvgSymbolInOut()}

        {/* form options */}

        {SvgSymbolOptionsLock()}
        {SvgSymbolOptionsQl()} {/* {SvgSymbolOptionsQl_firstVersion()} */}

        {/* info */}

        {SvgSymbolFolder()}
        {SvgSymbolAttention()}
        {SvgSymbolDot()}
        {SvgSymbolOpenLink()}
        {SvgSymbolGear()} {/* {SvgSymbolGear_8leafs()} */}

        {/* misc */}

        {SvgSymbolMenuBurger()}
        {SvgSymbolCross()}
        {SvgSymbolPen()}

        {/* Login and password change */}

        {SvgSymbolFormLogin()}
        {SvgSymbolFormChange()}

        {/* classic check boxes */}

        {SvgSymbolClassicCheck()}
        {SvgSymbolClassicCheckEmpty()}

        {/* chevrons */}

        {SvgSymbolChevronDown()}
        {SvgSymbolChevronUp()}
        {SvgSymbolChevronDoubleDown()}
        {SvgSymbolChevronRight()}
    </>);
}

/*
//good but not used

export function SymbolQuill_nun_but_good() {
    return (<>
        <symbol id="icon-quill" viewBox="0 0 32 32">
            <path d="M0 32c4-12 14.469-32 32-32-8.219 6.594-12 22-18 22s-6 0-6 0l-6 10h-2z"></path>
        </symbol>
    </>);
}

export function SymbolUser_nun_but_good() {
    return (<>
        <symbol id="icon-user" viewBox="0 0 32 32">
            <path
                d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z">
            </path>
        </symbol>
    </>);
}

export function SymbolUsers_nun_but_good() {
    return (<>
        <symbol id="icon-users" viewBox="0 0 32 32">
            <path
                d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z">
            </path>
            <path
                d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z">
            </path>
        </symbol>
    </>);
}
*/
