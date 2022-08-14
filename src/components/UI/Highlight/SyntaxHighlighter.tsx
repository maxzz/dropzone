import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
//import theme from './highlight-vs2015';
import theme from './highlight-night-owl';

SyntaxHighlighter.registerLanguage('xml', xml); /* cannot use lazy load */

export function SyntaxHighlighterXml({text}: {text: string}) {
    return (
        <SyntaxHighlighter language='xml' style={theme}>
            {text}
        </SyntaxHighlighter>
    );
}
