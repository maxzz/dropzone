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
    background: 'radial-gradient(circle, #679dff 0%, #3478f4 100%)',
    //background: 'radial-gradient(circle, rgba(109,149,222,1) 0%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(157,201,251,1) 0%, rgba(109,149,222,1) 45%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(157,201,251,1) 0%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(174,206,242,1) 0%, rgba(49,102,198,1) 100%)',
    //background: 'radial-gradient(circle, rgba(174,206,242,1) 0%, rgba(187,181,244,1) 100%)',
    //background: 'radial-gradient(circle, rgba(213,233,255,1) 0%, rgba(255,232,235,1) 100%)',
    //background: 'radial-gradient(circle, #c19191 0%, #607b98 100%)',
    //background: 'linear-gradient(135deg, var(--tm-primary-300-, #607b98), var(--tm-primary-800-, #c19191))', //#f4f4f4
    stroke: '#000000', //'#2d005e',
    strokeWidth: 'calc(6 - var(--size-div))',
});

const styleRect = css({
    '&:last-child': {
        fill: '#00ff62',
    }
});

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
                        // className={`${styleRect()} ${item.f ? 'fill-[#f0ddb0]' : 'fill-[#e8e8e8]'} last:fill-[red]`}
                        // className={`${styleRect()} ${item.f ? 'fill-[#f0ddb0]' : 'fill-[#e8e8e8]'}`}
                        className={`${styleRect()} ${item.f ? 'fill-[#d3d3d3]' : 'fill-[#e4e4e4]'}`}
                    >
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}
