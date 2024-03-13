import { PrimitiveAtom } from "jotai";

// Fields selection

export type SelectRowType = {
    field: number;
    form: number;
};

export type SelectRowAtomsType = {
    loginAtom: PrimitiveAtom<SelectRowType>;
    cpassAtom: PrimitiveAtom<SelectRowType>;
};
