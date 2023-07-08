import { SymbolDefPreview } from './all01-preview';
import { SymbolDefInOut } from './all02-in-out';
import { SymbolDefOptionsLock } from './all03-options-lock';
import { SymbolDefOptionsQl } from './all05-options-ql';
import { SymbolDefFolder } from './all06-folder';
import { SymbolDefAttention } from './all07-attention';
import { SymbolDefDot } from './all08-dot';
import { SymbolDefOpenLink } from './all09-open-link';
import { SymbolDefGear } from './all10-gear';
import { SymbolDefMenuBurger } from './all12-menu-burger';
import { SymbolDefCross } from './all13-cross';
import { SymbolDefPen } from './all14-pen';
import { SymbolDefFormLogin } from './all15-form-login';
import { SymbolDefFormChange } from './all16-form-change';
import { SymbolDefClassicCheck } from './all17-checkbox-classic';
import { SymbolDefClassicCheckEmpty } from './all18-checkbox-classic-empty';
import { SymbolDefChevronDown } from './all20-chevron-down';
import { SymbolDefChevronUp } from './all21-chevron-up';
import { SymbolDefChevronDoubleDown } from './all22-chevron-double-down';
import { SymbolDefChevronRight } from './all23-chevron-right';

export * from './all01-preview';
export * from './all02-in-out';
export * from './all03-options-lock';
//export * from './other04-options-ql-1st';
export * from './all05-options-ql';
export * from './all06-folder';
export * from './all07-attention';
export * from './all08-dot';
export * from './all09-open-link';
export * from './all10-gear';
//export * from './other11-gear-8leafs';
export * from './all12-menu-burger';
export * from './all13-cross';
export * from './all14-pen';
export * from './all15-form-login';
export * from './all16-form-change';
export * from './all17-checkbox-classic';
export * from './all18-checkbox-classic-empty';
export * from './all20-chevron-down';
export * from './all21-chevron-up';
export * from './all22-chevron-double-down';
export * from './all23-chevron-right';

export function DefAllOther() {
    return (<>
        {/* field row state */}

        {SymbolDefPreview()}
        {SymbolDefInOut()}

        {/* form options */}

        {SymbolDefOptionsLock()}
        {SymbolDefOptionsQl()} {/* {SymbolOptionsQl_firstVersion()} */}

        {/* info */}

        {SymbolDefFolder()}
        {SymbolDefAttention()}
        {SymbolDefDot()}
        {SymbolDefOpenLink()}
        {SymbolDefGear()} {/* {SymbolGear_8leafs()} */}

        {/* misc */}

        {SymbolDefMenuBurger()}
        {SymbolDefCross()}
        {SymbolDefPen()}

        {/* Login and password change */}

        {SymbolDefFormLogin()}
        {SymbolDefFormChange()}

        {/* classic check boxes */}

        {SymbolDefClassicCheck()}
        {SymbolDefClassicCheckEmpty()}

        {/* chevrons */}

        {SymbolDefChevronDown()}
        {SymbolDefChevronUp()}
        {SymbolDefChevronDoubleDown()}
        {SymbolDefChevronRight()}
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
