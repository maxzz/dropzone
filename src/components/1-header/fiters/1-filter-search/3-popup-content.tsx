import { SymbolDot } from '@ui/icons';

const popupContentDotClasses = "w-3 h-3 inline fill-none stroke-black";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

export function PopupContent() {
    return (
        <div className="text-sm py-1 px-1">
            <div className="font-bold">Search (Ctrl+D)</div>
            <div className="pb-1">Use the search prefix to dispay only:</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>win:</span> logins for Windows apps</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>web:</span> logins for web apps</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>why:</span> logins with problems to check why</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>cap:</span> logins with window caption</div>
            <div className=""><SymbolDot className={popupContentDotClasses} /><span className={popupContentTextClasses}>cls:</span> logins with window classname</div>
        </div>
    );
}
