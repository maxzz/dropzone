import { Transform } from "..";
import { Mani } from "../mani";
import { FieldTyp } from "../mani-types";

// FieldTyp convert

export function fieldTyp4Str(field: Mani.Field): FieldTyp {
    let rv = FieldTyp[field.type] || FieldTyp.und;
    return rv === FieldTyp.edit && field.password ? FieldTyp.psw : rv;
}

// Manifest specific functions

export function getPool(form: Mani.Form): string[] {
    return form && form.detection && form.detection.names_ext ? form.detection.names_ext.split(':') : [];
}

export function getPoolName(pool: string[], index: string): string {
    if (!index) {
        return '';
    }
    let n: number = index !== '' ? parseInt(`0x${index}`, 16) : -1;
    if (n < pool.length && n >= 0) {
        return Transform.removeEscapeChars(pool[n], '\\');
    }
    return '????????????';
}
