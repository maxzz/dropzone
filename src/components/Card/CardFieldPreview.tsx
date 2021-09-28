import React from 'react';
import { css } from '../../stitches.config';
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

const stylesSvg = css({
    '--size-div': 4,
    width: 'calc(1920px / var(--size-div))',
    height: 'calc(1200px / var(--size-div))',
    backgroundColor: 'red', //#f4f4f4
});

const styleRect = css({
    fill: '#e8e8e8',
    strokeWidth: 'calc(10 - var(--size-div))',
    stroke: '#d7a9ff',
})

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
            <svg viewBox={`0 0 ${size.w} ${size.h}`} className={stylesSvg()}>
                {thisRects.map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx}
                        className={`${styleRect()} ${item.f ? '!fill-[#f0ddb0]' : ''} last:fill-[red]`}
                    >
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}
