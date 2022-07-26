import React, { Fragment } from 'react';
import { UIToaster } from '@ui/UIToaster';
import { Section1_Header } from './components/Section1_Header/Section1_Header';
import { UISymbolDefs } from '@ui/UIIconSymbols';
import SelectedItems from './components/Panel3_SelectedItems/SelectedItems';
import Dialogs from './components/Panel4_Dialogs/Dialogs';
// import { SvgFontSpy } from './utils/SvgFontSpy';
import { Section2_Main } from './components/Section2_Main';
// import CardMenu from './components/Card/CardMenu';
// import CardMenuOverlays from './components/Card/CardMenuOverlays';
import './App.scss';

function App() {
    return (
        <Fragment>
            <UIToaster />
            <UISymbolDefs />

            <div className="h-screen p-4 space-y-3 flex flex-col overflow-hidden">
                <Section1_Header className="flex-none" />

                {/* <CardMenuOverlays /> */}
                {/* <CardMenu /> */}

                <SelectedItems className="flex-none" />

                <Section2_Main />

                <Dialogs />

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
