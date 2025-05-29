//import { SvgSymbolWin95Solid } from './app1-win95-solid';
import { SvgSymbolAppWindows } from './app2-app-windows';
import { SvgSymbolAppWebIeSolid } from './app3-app-web-ie-solid';
//import { SvgSymbolAppWebIe } from './app4-app-web-ie';
import { SvgSymbolAppWebChrome } from './app5-app-web-chrome';
import { SvgSymbolCatalog } from './app6-catalog';
import { SvgSymbolIconManualMode } from './app7-manual-mode';

//export * from './app1-win95-solid';
export * from './app2-app-windows';
export * from './app3-app-web-ie-solid';
//export * from './app4-app-web-ie';
export * from './app5-app-web-chrome';
export * from './app6-catalog';
export * from './app7-manual-mode';

export function DefAppTypes() {
    return (<>
        {SvgSymbolAppWindows()} 
        
        {/* {SvgSymbolWin95Solid()} */}
        {SvgSymbolAppWebIeSolid()} 
        
        {/* {SvgSymbolAppWebIe()} */}
        {SvgSymbolAppWebChrome()}
        {SvgSymbolCatalog()}
        {SvgSymbolIconManualMode()}
    </>);
}
