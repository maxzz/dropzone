import React from 'react';
import { SyntaxHighlighterXml } from '@ui/SyntaxHighlighter';

export function BodyAsHighlightedText({ text }: { text: string; }) {
    return (<>
        {/* Raw data preview (+ codemirror?) */}
        {/* 
        <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-primary-800 opacity-50 cursor-default`}>
            <div className="font-mono whitespace-pre">
                {text}
            </div>
        </UISemiScrollbar>
         */}

        <SyntaxHighlighterXml>
            {text}
        </SyntaxHighlighterXml>
    </>);
}

//TODO: extension 'text highlight' may cause a problem when user switch manifests (this is a thirdparty problem).
