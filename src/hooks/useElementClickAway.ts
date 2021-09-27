import { RefObject, useEffect, useRef } from 'react';
import { on, off } from 'react-use/esm/misc/util';

const defaultEvents = ['mousedown', 'touchstart'];

export const useClickAway = <E extends Event = Event>(
    ref: RefObject<HTMLElement | null>,
    onClickAway: (event: E) => void,
    events: string[] = defaultEvents
) => {
    const savedCallback = useRef(onClickAway);
    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);
    useEffect(() => {
        const handler = (event: Event) => {
            const { current: el } = ref;
            el && !el.contains(event.target) && savedCallback.current(event);
        };
        for (const eventName of events) {
            on(document, eventName, handler);
        }
        return () => {
            for (const eventName of events) {
                off(document, eventName, handler);
            }
        };
    }, [events, ref]);
};

export const useElementClickAway = <E extends Event = Event>(
    ref: RefObject<HTMLElement | null>,
    onClickAway: (event: E) => void,
    events: string[] = defaultEvents
) => {
    const savedCallback = useRef(onClickAway);
    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);
    useEffect(() => {
        const handler = (event) => {
            const { current: el } = ref;
            el && !el.contains(event.target) && savedCallback.current(event);
        };
        for (const eventName of events) {
            on(document, eventName, handler);
        }
        return () => {
            for (const eventName of events) {
                off(document, eventName, handler);
            }
        };
    }, [events, ref]);
};
