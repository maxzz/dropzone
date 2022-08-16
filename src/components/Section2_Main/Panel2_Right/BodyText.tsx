import React from 'react';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { SyntaxHighlighterXml } from '@ui/Highlight/SyntaxHighlighter';
import { List_Manifest } from '@/components/Section4_Dialogs/List_Manifest/List_Manifest';

export function BodyText({ text }: { text: string; }) {
    const runNew = 1;
    return (<>
        {/* Raw data preview (+ codemirror?) */}
        {/* 
        <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-primary-800 opacity-50 cursor-default`}>
            <div className="font-mono whitespace-pre">
                {text}
            </div>
        </UISemiScrollbar>
         */}

        <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-[#011627] opacity-60 cursor-default`}>
            {!!runNew ?
                <List_Manifest />
                :
                <div className="font-mono">
                    <SyntaxHighlighterXml>
                        {text}
                    </SyntaxHighlighterXml>
                </div>
            }
        </UISemiScrollbar>
    </>);
}
