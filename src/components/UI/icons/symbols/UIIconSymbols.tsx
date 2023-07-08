import { DefAppTypes } from './app';
import { DefFieldTypes } from './field';
import { DefAllOther } from './all-other';

export * from './app';
export * from './field';
export * from './all-other';

export function UISymbolDefs() {
    return (
        <svg id="svgfont" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
        >
            <defs>
                {DefAppTypes()}
                {DefFieldTypes()}
                {DefAllOther()}
            </defs>
        </svg>
    );
}
