import { DefAllOther } from './symbols/all-other';
import { DefAppTypes } from './symbols/app';
import { SymbolFieldBtn, SymbolFieldChk, SymbolFieldEdt, SymbolFieldLst, SymbolFieldPsw, SymbolFieldTxt } from './symbols/field';
import { SymbolUseIt0, SymbolUseIt1 } from './symbols/useit';

export * from './symbols/all-other';
export * from './symbols/app';
export * from './symbols/field';
export * from './symbols/useit';

export function UISymbolDefs() {
    return (
        <svg id="svgfont" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
        >
            <defs>
                {DefAppTypes()}

                {SymbolFieldEdt()}
                {SymbolFieldPsw()}
                {SymbolFieldChk()}
                {SymbolFieldLst()}
                {SymbolFieldTxt()}
                {SymbolFieldBtn()}

                {SymbolUseIt0()}
                {SymbolUseIt1()}

                {DefAllOther()}
            </defs>
        </svg>
    );
}
