import React from 'react';
import { FieldPath } from '@/store/manifest';
import { css } from '@/stitches.config';
import { classNames } from '@/utils/classnames';

const stylesSvg = css({
    // '--size-div': 4,
    // width: 'calc(1920px / var(--size-div))',
    // height: 'calc(1200px / var(--size-div))',
    //background: 'radial-gradient(circle, #679dff 0%, #3478f4 100%)',
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

type PreviewProps = {
    small: boolean; // show small preview: incative background and not hover effects
    form: Meta.Form;
    selected: number;
    onSelected?: (selected: number) => void;
} & React.HTMLAttributes<SVGSVGElement>;

export function FieldRowPreview({ small, form, selected, onSelected, ...attrs }: PreviewProps): JSX.Element | null {
    const view = form.view;
    if (!view || !view.rects.length) {
        return null;
    }
    let { rects, bounds } = view;

    const asbPos = true;
    if (asbPos) {
        let lt = { x: view.bounds.x1, y: view.bounds.y1 }; // left-top
        rects = rects.map((loc) => ({ ...loc, x: loc.x - lt.x, y: loc.y - lt.y, }));
        bounds = FieldPath.loc.utils.rectsBoundaries(rects);
    }

    const { className, ...rest } = attrs;
    const styles: React.CSSProperties = { background: small ? '#ccc' : 'radial-gradient(circle, #679dff 0%, #3478f4 100%)' };
    // const styles: React.CSSProperties = { background: small ? 'radial-gradient(circle, #c0c0c0 0%, #f5f5f5 100%)' : 'radial-gradient(circle, #679dff 0%, #3478f4 100%)' };
    // const styles: React.CSSProperties = { background: small ? 'radial-gradient(circle, #d2d2d2 0%, #adadad 100%)' : 'radial-gradient(circle, #679dff 0%, #3478f4 100%)' };
    const stylesRect: React.CSSProperties = { transition: 'fill .5s .5s' };

    return (
        <svg viewBox={`0 0 ${bounds.x2} ${bounds.y2}`} className={`${stylesSvg()} ${className}`} style={styles} {...rest}>
            {rects.map((rect, idx) => (
                <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} key={idx}
                    className={classNames(
                        idx === selected
                            ? 'fill-[#00ff62]'
                            : rect.f
                                ? 'fill-[#454545]'
                                : `fill-[#0008] ${small ? '' : 'hover:fill-[#2d6865]'}`
                    )}
                    style={rect.f ? {} : stylesRect}
                    onClick={(event) => onSelected && rect.f && (event.stopPropagation(), onSelected(idx))}
                >
                    {!small && <title>{`xy: ${rect.x},${rect.y} wh: ${rect.w} x ${rect.h}`}</title>}
                </rect>
            ))}
        </svg>
    );
}

//TODO: remove rect outside fields rect: {5cd5ac7d-7d6e-4395-94a6-36be1d6beea0}.dpm
//TODO: add abs switch
//TODO: field select from list and from preview
//TODO: card size change animations
