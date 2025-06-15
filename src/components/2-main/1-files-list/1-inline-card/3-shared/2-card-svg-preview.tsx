import { type JSX, type HTMLAttributes, type MouseEvent } from 'react';
import { FieldPath, type Meta } from '@/store/manifest';
import { css } from '@/stitches.config';
import { classNames } from '@/utils';

type PreviewProps = HTMLAttributes<SVGSVGElement> & {
    small: boolean;     // show small preview: incative background and not hover effects
    form: Meta.Form;
    selectedIdx: number;
    onSelectedIdx?: (selected: number) => void;
};

export function CardSvgPreview({ small, form, selectedIdx, onSelectedIdx, className, ...rest }: PreviewProps): JSX.Element | null {

    const view = form.view;
    if (!view || !view.rects.length) {
        return null;
    }

    let { rects, bounds } = view;

    const asbPos = true;
    if (asbPos) {
        const leftTop = { x: view.bounds.x1, y: view.bounds.y1 };
        rects = rects.map((loc) => ({ ...loc, x: loc.x - leftTop.x, y: loc.y - leftTop.y, }));

        bounds = FieldPath.loc.utils.rectsBoundaries(rects);
    }

    return (
        <svg viewBox={`0 0 ${bounds.x2} ${bounds.y2}`} className={`${stylesSvg()} ${className}`} style={styles(small)} {...rest}>
            {rects.map(
                (rect, idx) => {
                    const isField = !!rect.f;
                    const cls = rowClasses(idx === selectedIdx, isField, small);
                    const stl = stylesRect(isField);
                    const clk = (event: MouseEvent) => onSelectedIdx && isField && (event.stopPropagation(), onSelectedIdx(idx));
                    return (
                        <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} className={cls} style={stl} key={idx} onClick={clk}>
                            {!small && (
                                <title>{`xy: ${rect.x},${rect.y} wh: ${rect.w} x ${rect.h}`}</title>
                            )}
                        </rect>
                    );
                }
            )}
        </svg>
    );
}

function rowClasses(selected: boolean, isField: boolean, small: boolean) {
    return classNames(
        selected
            ? 'fill-[#00ff62]'
            : isField
                ? 'fill-[#454545]'
                : `fill-[#0008] ${small ? '' : 'hover:fill-[#2d6865]'}`
    );
}

const stylesSvg = css({
    // '--size-div': 4,
    // width: 'calc(1920px / var(--size-div))',
    // height: 'calc(1200px / var(--size-div))',
    //background: 'radial-gradient(circle, #679dff 0%, #3478f4 100%)',
    stroke: '#d1d1d1',
    strokeWidth: 1,
});

const styles = (small: boolean) => ({ background: small ? '#ccc' : 'radial-gradient(circle, #679dff 0%, #3478f4 100%)' });
// const styles: React.CSSProperties = { background: small ? 'radial-gradient(circle, #c0c0c0 0%, #f5f5f5 100%)' : 'radial-gradient(circle, #679dff 0%, #3478f4 100%)' };
// const styles: React.CSSProperties = { background: small ? 'radial-gradient(circle, #d2d2d2 0%, #adadad 100%)' : 'radial-gradient(circle, #679dff 0%, #3478f4 100%)' };

const stylesRect = (isField: boolean) => (isField ? {} : { transition: 'fill .5s .5s' });
// const styleRect = css({ '&:last-child': { fill: '#00ff62' }, variants: { field: { true: { fill: '#454545' } } } });

//TODO: remove rect outside fields rect: {5cd5ac7d-7d6e-4395-94a6-36be1d6beea0}.dpm
//TODO: add abs switch
//TODO: field select from list and from preview
//TODO: card size change animations
