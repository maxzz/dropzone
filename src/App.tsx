import React from 'react';
import { UIToaster } from '@ui/UIToaster';
import { Section1_Header } from './components/Section1_Header/Section1_Header';
import { Section2_Main } from './components/Section2_Main/Section2_Main';
import { Section4_Dialogs } from './components/Section4_Dialogs/Section4_Dialogs';
import { UISymbolDefs } from '@ui/UIIconSymbols';
import './App.scss';
//import { SpySvgSymbols } from './utils/SpySvgSymbols';

function App() {
    return (<>
        <UIToaster />
        <UISymbolDefs />

        <div className="h-screen p-1 pt-2 space-y-2 flex flex-col overflow-hidden">
            <Section1_Header className="flex-none" />
            <Section2_Main />
            <Section4_Dialogs />
            {/* <SpySvgSymbols /> */}
        </div>
    </>);
}

export default App;
