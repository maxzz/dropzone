//import { SymbolWin95Solid } from './app1-win95-solid';
import { SymbolAppWindows } from './app2-app-windows';
import { SymbolAppWebIeSolid } from './app3-app-web-ie-solid';
//import { SymbolAppWebIe } from './app4-app-web-ie';
import { SymbolAppWebChrome } from './app5-app-web-chrome';
import { SymbolCatalog } from './app6-catalog';
import { SymbolIconManualMode } from './app7-manual-mode';

//export * from './app1-win95-solid';
export * from './app2-app-windows';
export * from './app3-app-web-ie-solid';
//export * from './app4-app-web-ie';
export * from './app5-app-web-chrome';
export * from './app6-catalog';
export * from './app7-manual-mode';

export function DefAppTypes() {
    return (<>
        {SymbolAppWindows()} 
        
        {/* {SymbolWin95Solid()} */}
        {SymbolAppWebIeSolid()} 
        
        {/* {SymbolAppWebIe()} */}
        {SymbolAppWebChrome()}
        {SymbolCatalog()}
        {SymbolIconManualMode()}
    </>);
}
