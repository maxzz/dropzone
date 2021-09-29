import React from 'react';
import { css } from '../../stitches.config';
import { FieldPath } from '../../store/manifest/mani-functions';

function rectsBoundaries(rects: MPath.Chunk_loc[]): { x1: number; y1: number; x2: number; y2: number; } {
    let x1 = 0; // x1,y1 ┌──────┐
    let y1 = 0; //       │      │
    let x2 = 0; //       └──────┘ x2,y2
    let y2 = 0;
    rects.forEach(rect => {
        if (rect.x > x1) {
            x1 = rect.x;
        }
        if (rect.y > y1) {
            y1 = rect.y;
        }
        if (rect.x + rect.w > x2) {
            x2 = rect.x + rect.w;
        }
        if (rect.y + rect.h > y2) {
            y2 = rect.y + rect.h;
        }
    });
    return { x1, y1, x2, y2 };
}

const stylesSvg = css({
    '--size-div': 4,
    width: 'calc(1920px / var(--size-div))',
    height: 'calc(1200px / var(--size-div))',
    background: 'radial-gradient(circle, #679dff 0%, #3478f4 100%)',
    stroke: '#d1d1d1', //#2d005e #00000080 #b19b9b80
    strokeWidth: 1,
});

const styleRect = css({
    '&:last-child': {
        fill: '#00ff62',
    },
    variants: {
        field: {
            true: {
                fill: '#454545',
            },
        }
    },
});

export function FieldPreview({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {
    let boundaries = rectsBoundaries(form.rects);
    let thisRects = [...form.rects];
    //console.log('rect', thisRects);

    FieldPath.PathLocations.utils.addLastRect(field, thisRects);

    return (
        <div className="rects">
            <svg viewBox={`0 0 ${boundaries.x2} ${boundaries.y2}`} className={stylesSvg()}>
                {thisRects.map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx} className={`${styleRect({field: !!item.f})}`} >
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}
