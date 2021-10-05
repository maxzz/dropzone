import { atom, Getter, WritableAtom } from 'jotai';

export default function atomWithCallback<Value>(initialValue: Value, onValueChange: (get: Getter, nextValue: Value) => void): WritableAtom<Value, Value> {
    const baseAtom = atom(initialValue);
    const derivedAtom = atom<Value, Value>(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);
            onValueChange(get, nextValue);
        }
    );
    return derivedAtom;
}
