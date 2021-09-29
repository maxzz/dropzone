import React from 'react';
import { css } from '../../stitches.config';
import { FieldPath } from '../../store/manifest/mani-functions';

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

function getFieldRects(form: Meta.Form, field: Meta.Field) {
    let boundaries = FieldPath.PathLocations.utils.rectsBoundaries(form.rects);
    let thisRects = [...form.rects];
    //console.log('rect', thisRects);

    FieldPath.PathLocations.utils.addLastRect(field, thisRects);

    return { rects: thisRects, boundaries };
}

export function FieldPreview({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {

    const {rects ,boundaries} = getFieldRects(form, field);

    // let boundaries = FieldPath.PathLocations.utils.rectsBoundaries(form.rects);
    // let thisRects = [...form.rects];
    // //console.log('rect', thisRects);

    // FieldPath.PathLocations.utils.addLastRect(field, thisRects);

    return (
        <div className="rects">
            <svg viewBox={`0 0 ${boundaries.x2} ${boundaries.y2}`} className={stylesSvg()}>
                {rects .map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx} className={`${styleRect({ field: !!item.f })}`} >
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}
