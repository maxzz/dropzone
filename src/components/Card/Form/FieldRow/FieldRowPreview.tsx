import React from 'react';
import { css } from '../../../../stitches.config';
import { FieldPath } from '../../../../store/manifest/mani-functions';

const stylesSvg = css({
    '--size-div': 4,
    width: 'calc(1920px / var(--size-div))',
    height: 'calc(1200px / var(--size-div))',
    background: 'radial-gradient(circle, #679dff 0%, #3478f4 100%)',
    stroke: '#d1d1d1',
    strokeWidth: 1,
});

// const styleRect = css({
//     '&:last-child': {
//         fill: '#00ff62',
//     },
//     variants: {
//         field: {
//             true: {
//                 fill: '#454545',
//             },
//         }
//     },
// });

function FieldRowPreview({ form, highlight }: { form: Meta.Form; highlight: number; }): JSX.Element | null {
    const view = form.view;
    if (!view) {
        return null;
    }
    let { rects, bounds } = view;

    const asbPos = true;
    if (asbPos) {
        let lt = { x: view.bounds.x1, y: view.bounds.y1 }; // left-top
        rects = rects.map((loc) => ({ ...loc, x: loc.x - lt.x, y: loc.y - lt.y, }));
        bounds = FieldPath.loc.utils.rectsBoundaries(rects);
    }

    return (
        <svg viewBox={`0 0 ${bounds.x2} ${bounds.y2}`} className={stylesSvg()}>
            {rects.map((rect, idx) => (
                <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} key={idx}
                    className={`${idx === highlight ? 'fill-[#00ff62]' : rect.f ? 'fill-[#454545]' : 'fill-[#0008] hover:fill-[beige]'}`}
                >
                    <title>{`xy: ${rect.x},${rect.y} wh: ${rect.w} x ${rect.h}`}</title>
                </rect>
            ))}
        </svg>
    );
}

export default FieldRowPreview;
