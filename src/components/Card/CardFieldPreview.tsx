import React from 'react';
import { FieldPath } from '../../store/manifest/mani-functions';

function maxRect(rects: MPath.Chunk_loc[]) {
    let w = 0;
    let h = 0;
    rects.forEach(rect => {
        if (rect.x + rect.w > w) {
            w = rect.x + rect.w;
        }
        if (rect.y + rect.h > h) {
            h = rect.y + rect.h;
        }
    });
    return { w, h };
}

export function FieldPreview({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {
    let maxSize = maxRect(form.rects);
    let thisRects = [...form.rects];

    let fieldLocs = FieldPath.PathLocations.pathItem_loc2items(field.path.loc || '');
    if (fieldLocs.length) {
        thisRects.push(fieldLocs[fieldLocs.length - 1]);
    }

    return (
        <div className="rects">
            <svg viewBox={`0 0 ${maxSize.w} ${maxSize.h}`}>
                {thisRects.map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx} className={`${item.f ? 'last-field' : ''}`}>
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}
