import { Section } from './5-section';

export function PartStr({ part, label }: { part: string | object; label: string; }) {
    const text = typeof part === 'string' ? part : JSON.stringify(part, null, 4);
    
    return (<>
        {!!part && (
            <div>
                <Section label={label} />

                <div>
                    {text}
                </div>
            </div>
        )}
    </>);
}
