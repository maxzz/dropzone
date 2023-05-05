import { Mani, ValueAs, ValueLife, fieldTyp4Str } from "../mani-types";

export namespace TransformValue {

    export function valueLife4Mani(field: Mani.Field): ValueLife {
        const { askalways, onetvalue, value } = field;
        const vl: ValueLife = {
            valueAs:
                (!onetvalue && !askalways)
                    ? ValueAs.askReuse
                    : (!onetvalue && askalways)
                        ? ValueAs.askConfirm
                        : ValueAs.askAlways, // legal:(onetvalue && askalways) and illegal:(onetvalue && !askalways)
            ...(field.password && { isPsw: true }),
            //...(field.type !== 'edit' && field.type !== 'combo' && { isBtn: true }),
            fType: fieldTyp4Str(field),
        };
        if (value) {
            vl.isRef = value?.[0] === '@';
            vl.value = value?.replace(/^@/, '');
            vl.isRef = vl.isRef && !!vl.value && vl.value[0] !== '@'; // case for '@@'
        }
        return vl;
    }

    export function valueLife2Mani(vl: ValueLife, field: Mani.Field): void {
        const { valueAs: va } = vl;
        va === ValueAs.askReuse
            ? (field.onetvalue = undefined, field.askalways = undefined)
            : va === ValueAs.askConfirm
                ? (field.onetvalue = undefined, field.askalways = true)
                : (field.onetvalue = true, field.askalways = true);
        vl.value && (field.value = `${vl.isRef ? (vl.value[0] === '@' ? '@@' : '@') : ''}${vl.value}`);
    }

    //TODO: skip recording of '=== undefined' values
} //namespace TransformValue
