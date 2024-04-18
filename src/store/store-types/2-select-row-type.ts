import { PrimitiveAtom } from "jotai";

// Fields selection

export type SelectRowType = {
    fieldIdx: number;   // selected field index
    formType: number;   // form type 0 | 1
};

export type SelectRowAtomsType = {
    loginAtom: PrimitiveAtom<SelectRowType>;
    cpassAtom: PrimitiveAtom<SelectRowType>;
};
