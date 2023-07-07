import React, { HTMLAttributes, SVGAttributes, SVGProps } from 'react';
import { DefAllOther } from './symbols/all-other';
import { DefAppTypes } from './symbols/app';
import { DefFieldTypes } from './symbols/field';
import { SymbolUseIt0, SymbolUseIt1 } from './symbols/useit';

export * from './symbols/all-other';
export * from './symbols/app';
export * from './symbols/field';
export * from './symbols/useit';

export function UISymbolDefs() {
    return (
        <svg id="svgfont" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
        >
            <defs>
                {DefAppTypes()}
                {DefFieldTypes()}

                {SymbolUseIt0()}
                {SymbolUseIt1()}

                {DefAllOther()}
            </defs>
        </svg>
    );
}
