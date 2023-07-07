import React, { useEffect } from 'react';
import { FocusGuards } from '@radix-ui/react-focus-guards';
import { UIToaster } from '@ui/UiToaster';
import { Section1_Header } from './components/Section1_Header';
import { Section2_Main } from './components/Section2_Main';
import { Section4_Dialogs } from './components/Section4_Dialogs';
import { UISymbolDefs } from '@ui/icons';
import './styles/App.scss';
//import { SpySvgSymbols } from './utils/SpySvgSymbols';

export function App() {
    useEffect(() => {
        const guards = [...document.querySelectorAll('[data-radix-focus-guard]')] as HTMLSpanElement[];
        guards.forEach((guard) => { guard.dataset['ariaHidden'] = 'true'; guard.setAttribute('aria-hidden', 'true'); });
    }, []);
    return (
        <FocusGuards>
            <UIToaster />
            <UISymbolDefs />

            <div className="h-screen p-1 pt-2 space-y-2 flex flex-col overflow-hidden">
                <Section1_Header className="flex-none" />
                <Section2_Main />
                <Section4_Dialogs />
                {/* <SpySvgSymbols /> */}
            </div>
        </FocusGuards>
    );
}

//C:\Users\maxzz\Desktop\HID bugs\89863\temp-for-max
//TODO: add orange attention mark to ach card with duplicated urls and as result domain credentials
