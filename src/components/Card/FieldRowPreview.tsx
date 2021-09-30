import React from 'react';
import { css } from '../../stitches.config';
import { FieldPath } from '../../store/manifest/mani-functions';

const stylesSvg = css({
    '--size-div': 4,
    width: 'calc(1920px / var(--size-div))',
    height: 'calc(1200px / var(--size-div))',
    background: 'radial-gradient(circle, #679dff 0%, #3478f4 100%)',
    stroke: '#d1d1d1',
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

function FieldRowPreview({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {
    const { rects, bounds } = FieldPath.loc.utils.getFieldRects(form, field);
    return (
        <div className="rects">
            <svg viewBox={`0 0 ${bounds.x2} ${bounds.y2}`} className={stylesSvg()}>
                {rects.map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx} className={`${styleRect({ field: !!item.f })}`} >
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}

export default FieldRowPreview;
