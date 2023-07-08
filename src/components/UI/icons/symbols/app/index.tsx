//import { SymbolWin95Solid } from './app1-win95-solid';
import { SymbolDefAppWindows } from './app2-app-windows';
import { SymbolDefAppWebIeSolid } from './app3-app-web-ie-solid';
//import { SymbolAppWebIe } from './app4-app-web-ie';
import { SymbolDefAppWebChrome } from './app5-app-web-chrome';
import { SymbolDefCatalog } from './app6-catalog';
import { SymbolDefIconManualMode } from './app7-manual-mode';

//export * from './app1-win95-solid';
export * from './app2-app-windows';
export * from './app3-app-web-ie-solid';
//export * from './app4-app-web-ie';
export * from './app5-app-web-chrome';
export * from './app6-catalog';
export * from './app7-manual-mode';

export function DefAppTypes() {
    return (<>
        {SymbolDefAppWindows()} 
        
        {/* {SymbolWin95Solid()} */}
        {SymbolDefAppWebIeSolid()} 
        
        {/* {SymbolAppWebIe()} */}
        {SymbolDefAppWebChrome()}
        {SymbolDefCatalog()}
        {SymbolDefIconManualMode()}
    </>);
}
