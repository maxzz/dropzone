import { SymbolFieldEdt } from './field1-edt';
import { SymbolFieldPsw } from './field2-psw';
import { SymbolFieldLst } from './field3-lst';
import { SymbolFieldChk } from './field4-chk';
import { SymbolFieldBtn } from './field5-btn';
import { SymbolFieldTxt } from './field6-txt';
import { SymbolFieldUseIt0 } from './field10-useit-0';
import { SymbolFieldUseIt1 } from './field11-useit-1';

export * from './field1-edt';
export * from './field2-psw';
export * from './field3-lst';
export * from './field4-chk';
export * from './field5-btn';
export * from './field6-txt';
export * from './field10-useit-0';
export * from './field11-useit-1';

export function DefFieldTypes() {
    return (<>
        {SymbolFieldEdt()}
        {SymbolFieldPsw()}
        {SymbolFieldChk()}
        {SymbolFieldLst()}
        {SymbolFieldTxt()}
        {SymbolFieldBtn()}
        {SymbolFieldUseIt0()}
        {SymbolFieldUseIt1()}
    </>);
}
