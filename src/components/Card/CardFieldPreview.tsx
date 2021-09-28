import React from 'react';
import { FieldPath } from '../../store/manifest/mani-functions';

function maxRect(rects: MPath.Chunk_loc[]): { x: number; y: number; w: number; h: number; } {
    let x = 0;
    let y = 0;
    let w = 0;
    let h = 0;
    rects.forEach(rect => {
        if (rect.x > x) {
            x = rect.x;
        }
        if (rect.y > y) {
            y = rect.y;
        }
        if (rect.x + rect.w > w) {
            w = rect.x + rect.w;
        }
        if (rect.y + rect.h > h) {
            h = rect.y + rect.h;
        }
    });
    return { x, y, w, h };
}

export function FieldPreview({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {
    let size = maxRect(form.rects);
    let thisRects = [...form.rects];
    console.log('rect', thisRects);
    

    let fieldLocs = FieldPath.PathLocations.pathItem_loc2items(field.path.loc || '');
    if (fieldLocs.length) {
        thisRects.push(fieldLocs[fieldLocs.length - 1]);
    }

    return (
        <div className="rects">
            <svg viewBox={`0 0 ${size.w} ${size.h}`}>
                {thisRects.map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx} className={`${item.f ? 'last-field' : ''}`}>
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}
