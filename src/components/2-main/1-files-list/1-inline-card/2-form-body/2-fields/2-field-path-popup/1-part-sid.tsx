import { Fragment } from 'react';
import { MPath, TransformEncoding } from '@/store/manifest';
import { Section } from './5-section';

export function PartSid({ part, label }: { part: MPath.sid; label: string; }) {
    const { version, ...rest } = part;
    part = { ...rest, version };
    const items = Object.entries(part);
    
    return (<>
        {!!part && (
            <div>
                <Section label={label} />

                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-1">
                    {items.map(
                        ([key, val]) => (
                            <Fragment key={key}>
                                <div className="font-bold text-primary-700">
                                    {key}
                                </div>

                                <div>
                                    {TransformEncoding.xmlRestore(val) || `""`}
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        )}
    </>);
}
