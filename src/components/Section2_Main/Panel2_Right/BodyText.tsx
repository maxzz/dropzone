import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import xml from 'react-syntax-highlighter/dist/esm/languages/prism/xml-doc';
import st from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

SyntaxHighlighter.registerLanguage('xml-doc', xml);

export default function BodyText({ text }: { text: string; }) { /*lazy load*/
    return (<>
        {/* Raw data preview (+ codemirror?) */}
        {/* 
        <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-primary-800 opacity-50 cursor-default`}>
            <div className="font-mono whitespace-pre">
                {text}
            </div>
        </UISemiScrollbar>
         */}
        <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-primary-800 opacity-50 cursor-default`}>
            {/* <div className="font-mono whitespace-pre"> */}
            <div className="font-mono">
                <SyntaxHighlighter language='xml' style={st}>
                    {text}
                </SyntaxHighlighter>
            </div>
        </UISemiScrollbar>
    </>);
}