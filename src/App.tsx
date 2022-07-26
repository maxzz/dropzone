import React, { Fragment } from 'react';
import { UIToaster } from '@ui/UIToaster';
import { Section1_Header } from './components/Section1_Header/Section1_Header';
import { Section2_Main } from './components/Section2_Main/Section2_Main';
import { Panel3_SelectedItems } from './components/Section2_Main/Panel3_SelectedItems/Panel3_SelectedItems';
import { Panel4_Dialogs } from './components/Panel4_Dialogs/Panel4_Dialogs';
import { UISymbolDefs } from '@ui/UIIconSymbols';
// import { CardMenu } from './components/Card/CardMenu';
// import { CardMenuOverlays } from './components/Card/CardMenuOverlays';
import './App.scss';
// import { SvgFontSpy } from './utils/SvgFontSpy';

function App() {
    return (
        <Fragment>
            <UIToaster />
            <UISymbolDefs />

            <div className="h-screen p-4 space-y-3 flex flex-col overflow-hidden">
                <Section1_Header className="flex-none" />

                {/* <CardMenuOverlays /> */}
                {/* <CardMenu /> */}

                <Panel3_SelectedItems className="flex-none" />

                <Section2_Main />

                <Panel4_Dialogs />

                {/* <SvgFontSpy /> */}
            </div>
        </Fragment>
    );
}

export default App;

//TODO: limit list width to 382
//TODO: show file size and total files size
//TODO: copy to clipboard filename
//TODO: show build version
