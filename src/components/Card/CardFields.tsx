import React from 'react';
import { CardData } from './Card';
import FormOptions from './FormOptions';

// Form detection and options

export function FormDetectioAndOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    return (
        <>
            <FormOptions cardData={cardData} formIndex={formIndex} />
        </>
    );
}
