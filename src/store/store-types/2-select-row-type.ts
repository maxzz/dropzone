
// Fields selection

export type SelectRowType = {
    fieldIdx: number;   // selected field index
    formType: number;   // form type 0 | 1
};

export type SelectRowAtomsType = {
    loginAtom: PA<SelectRowType>;
    cpassAtom: PA<SelectRowType>;
};
