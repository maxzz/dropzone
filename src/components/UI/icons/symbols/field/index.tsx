import { SymbolDefFieldEdt } from './field1-edt';
import { SymbolDefFieldPsw } from './field2-psw';
import { SymbolDefFieldLst } from './field3-lst';
import { SymbolDefFieldChk } from './field4-chk';
import { SymbolDefFieldBtn } from './field5-btn';
import { SymbolDefFieldTxt } from './field6-txt';
import { SymbolDefFieldUseIt0 } from './field10-useit-0';
import { SymbolDefFieldUseIt1 } from './field11-useit-1';

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
        {SymbolDefFieldEdt()}
        {SymbolDefFieldPsw()}
        {SymbolDefFieldChk()}
        {SymbolDefFieldLst()}
        {SymbolDefFieldTxt()}
        {SymbolDefFieldBtn()}
        {SymbolDefFieldUseIt0()}
        {SymbolDefFieldUseIt1()}
    </>);
}
