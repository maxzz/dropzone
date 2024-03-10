import React, { HTMLAttributes } from 'react';
import { SyntaxHighlighterXml } from './syntax-highlighter-xml';
import { Scroller } from '../scroller';

export function Body_Xml({ text, ...rest }: { text: string; } & HTMLAttributes<HTMLDivElement>) {
    return (<>
        {/* Raw data preview (+ codemirror?) */}
        {/* 
        <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-primary-800 opacity-50 cursor-default`}>
            <div className="font-mono whitespace-pre">
                {text}
            </div>
        </UISemiScrollbar>
         */}

        <Scroller {...rest}>
            <SyntaxHighlighterXml>
                {text}
            </SyntaxHighlighterXml>
        </Scroller>
    </>);
}

//TODO: extension 'text highlight' may cause a problem when user switch manifests (this is a thirdparty problem).
