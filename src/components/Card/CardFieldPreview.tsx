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
    //background: 'radial-gradient(circle, rgba(109,149,222,1) 0%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(157,201,251,1) 0%, rgba(109,149,222,1) 45%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(157,201,251,1) 0%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(174,206,242,1) 0%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(174,206,242,1) 0%, rgba(187,181,244,1) 100%)',
    //background: 'radial-gradient(circle, rgba(213,233,255,1) 0%, rgba(255,232,235,1) 100%)',
    //background: 'radial-gradient(circle, #c19191 0%, #607b98 100%)',
    //background: 'linear-gradient(135deg, var(--tm-primary-300-, #607b98), var(--tm-primary-800-, #c19191))', //#f4f4f4
    stroke: '#d1d1d1', //#2d005e #00000080 #b19b9b80
    // strokeWidth: 'calc(6 - var(--size-div))',
    strokeWidth: 1,
});

const styleRect = css({
    '&:last-child': {
        fill: '#00ff62',
    }
});

export function FieldPreview({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {
    let boundaries = rectsBoundaries(form.rects);
    let thisRects = [...form.rects];
    console.log('rect', thisRects);


    let fieldLocs = FieldPath.PathLocations.pathItem_loc2items(field.path.loc || '');
    if (fieldLocs.length) {
        thisRects.push(fieldLocs[fieldLocs.length - 1]);
    }

    return (
        <div className="rects">
            <svg viewBox={`0 0 ${boundaries.x2} ${boundaries.y2}`} className={stylesSvg()}>
                {thisRects.map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx}
                        // className={`${styleRect()} ${item.f ? 'fill-[#f0ddb0]' : 'fill-[#e8e8e8]'} last:fill-[red]`}
                        // className={`${styleRect()} ${item.f ? 'fill-[#f0ddb0]' : 'fill-[#e8e8e8]'}`}
                        // className={`${styleRect()} ${item.f ? 'fill-[#d3d3d3]' : 'fill-[#e4e4e4]'}`}
                        className={`${styleRect()} ${item.f ? 'fill-[#454545]' : ''}`}
                    >
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}
