import React from 'react';
//import { Light as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { default as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm/light';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
//import theme from './highlight-vs2015';
import theme from './highlight-night-owl';

SyntaxHighlighter.registerLanguage('xml', xml); /* cannot use lazy load */

export function SyntaxHighlighterXml({children, ...rest}: SyntaxHighlighterProps) {
    return (
        <SyntaxHighlighter language='xml' style={theme} {...rest}>
            {children}
        </SyntaxHighlighter>
    );
}
