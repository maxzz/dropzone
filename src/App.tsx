import React from 'react';
import Toaster from '@ui/UiToaster';
import HeaderBar from './components/Header/HeaderBar';
//import UISplitPane from '@ui/UISplitPane';
//import SimpleSplitPane from '@ui/SimpleSplitPane';
import UISymbolsDefs from '@ui/UIIconsSymbolsDefs';
import SelectedItems from './components/SelectedItems';
import Dialogs from './components/Dialogs';
// import { SvgFontSpy } from './utils/SvgFontSpy';
import { Section2_Main } from './components/Section2_Main';
// import CardMenu from './components/Card/CardMenu';
// import CardMenuOverlays from './components/Card/CardMenuOverlays';
import './App.scss';

function App() {
    // const atom = 1;
    return (
        <React.Fragment>
            <Toaster />
            <UISymbolsDefs />

            <div className="h-screen p-4 space-y-3 flex flex-col overflow-hidden">
                <HeaderBar className="flex-none" />

                {/* <CardMenuOverlays /> */}
                {/* <CardMenu /> */}

                <SelectedItems className="flex-none" />

                <Section2_Main />

                <Dialogs />

                {/* <SvgFontSpy /> */}
            </div>
        </React.Fragment>
    );
}

export default App;

//TODO: limit list width to 382
//TODO: show file size and total files size
//TODO: copy to clipboard filename
//TODO: show build version
